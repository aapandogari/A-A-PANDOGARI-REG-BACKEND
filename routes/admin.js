const router = require("express").Router();

const sequelize =
require("../config/database");

const CoreTeamApplication =
require("../models/CoreTeamApplication");


const OfficialMember =
require("../models/OfficialMember");


const ApplicationLog =
require("../models/ApplicationLog");


const auth =
require("../middleware/auth");


const sendApprovalEmail =
require("../services/emailService");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


const DigitalCard =
require("../models/DigitalCard");

const generateQR =
require("../utils/qrGenerator");

const createCard =
require("../services/cardGenerator");

const uploadToS3 =
require("../services/uploadService");


// ADMIN LOGIN

router.post(
"/login",
async(req,res)=>{

try{

const {
email,
username,
password
}=req.body;


const loginValue = email || username;


const admin =
await Admin.findOne({

where:{
[require("sequelize").Op.or]:[
{
email:loginValue
},
{
username:loginValue
}
]
}
  
});

  

if(!admin){

return res.status(401)
.json({

message:"Invalid email or password"

});

}



const match =
await bcrypt.compare(

password,

admin.password_hash

);



if(!match){

return res.status(401)
.json({

message:"Invalid email or password"

});

}



const token =
jwt.sign(

{

id:admin.id,

email:admin.email,

role:admin.role

},

process.env.JWT_SECRET,

{

expiresIn:"24h"

}

);



res.json({

success:true,

token

});


}


catch(error){

res.status(500)
.json({

message:error.message

});

}


});



// GET ALL APPLICATIONS

router.get(
"/applications",
auth,
async(req,res)=>{

try{


const applications =
await CoreTeamApplication.findAll({

order:[
["created_at","DESC"]
]

});


res.json(applications);


}

catch(error){

res.status(500)
.json({

message:error.message

});

}


});






// GET SINGLE APPLICATION


router.get(
"/applications/:id",
auth,
async(req,res)=>{


try{


const application =
await CoreTeamApplication.findByPk(
req.params.id
);



if(!application){

return res.status(404)
.json({

message:"Application not found"

});

}



res.json(application);


}

catch(error){

res.status(500)
.json({

message:error.message

});

}


});




//APPROVE APPLICATION

router.patch(

"/applications/:id/approve",

auth,

async(req,res)=>{


const transaction =
await sequelize.transaction();


try{


const application =
await CoreTeamApplication.findByPk(

req.params.id,

{
transaction
}

);



if(!application){

await transaction.rollback();

return res.status(404)
.json({

message:"Application not found"

});

}




if(
application.application_status === "Approved"
){

await transaction.rollback();

return res.status(400)
.json({

message:"Already approved"

});

}





const memberID =

"AAP-CORE-" +

Date.now()
.toString()
.slice(-6);






await application.update(

{

application_status:"Approved",

admin_note:
req.body.note || ""

},

{
transaction
}

);







const member =

await OfficialMember.create(

{

member_id:
memberID,


application_id:
application.id,


full_name:
application.full_name,


team_id:
application.team_id,


username:
application.team_username,


role:
application.preferred_role,


selfie_url:
application.selfie_url


},

{
transaction
}

);







await ApplicationLog.create(

{

application_id:
application.id,


admin_id:
req.admin?.id,


action:
"Application Approved",


note:
req.body.note || ""

},

{
transaction
}

);






await transaction.commit();





// EMAIL AFTER DATABASE SUCCESS


try{


await sendApprovalEmail(

application.email,

application.full_name,

memberID

);


}

catch(emailError){


console.log(

"Approval email failed:",

emailError.message

);


}







res.json({

success:true,

message:
"Application Approved",

memberID

});



}

catch(error){



await transaction.rollback();


console.log(error);



res.status(500)
.json({

message:error.message

});


}


});




// GENERATE ID CARD


router.post(

"/members/:id/generate-card",

auth,

async(req,res)=>{


try{


const member =
await OfficialMember.findByPk(
req.params.id
);



if(!member){

return res.status(404)
.json({

message:"Member not found"

});

}




const qrURL =
await generateQR(

`https://a-a-pandogari-registration-form.vercel.app/verify/${member.member_id}`

);



const cardBuffer =
await createCard({

full_name:
member.full_name,

member_id:
member.member_id,

team:
member.team_id,

role:
member.role

});



const cardURL =
await uploadToS3(

{

buffer:cardBuffer,

originalname:
`${member.member_id}.png`,

mimetype:
"image/png"

},

"cards"

);





await DigitalCard.create({

member_id:
member.id,

qr_code:
qrURL,

card_url:
cardURL

});





res.json({

success:true,

message:"ID Card Generated",

cardURL

});


}

catch(error){

console.log(error);

res.status(500)
.json({

message:error.message

});

}


});




// REJECT APPLICATION


router.patch(

"/applications/:id/reject",

auth,

async(req,res)=>{


try{


const application =
await CoreTeamApplication.findByPk(
req.params.id
);



if(!application){

return res.status(404)
.json({

message:"Application not found"

});

}




await application.update({

application_status:"Rejected",

admin_note:
req.body.note || ""

});






await ApplicationLog.create({

application_id:
application.id,

admin_id:
req.admin?.id,

action:
"Application Rejected",

note:
req.body.note || ""

});





res.json({

success:true,

message:"Application Rejected"

});


}


catch(error){


res.status(500)
.json({

message:error.message

});

}


});


// GET ALL OFFICIAL MEMBERS

router.get(
"/members",
auth,
async(req,res)=>{

try{

const members =
await OfficialMember.findAll({

order:[
["created_at","DESC"]
]

});


res.json(members);


}

catch(error){

res.status(500)
.json({

message:error.message

});

}


});


module.exports = router;