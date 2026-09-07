const router = require("express").Router();


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





// GET ALL APPLICATIONS

router.get(
"/applications",
auth,
async(req,res)=>{

try{


const applications =
await CoreTeamApplication.findAll({

order:[
["createdAt","DESC"]
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







// APPROVE APPLICATION


router.patch(

"/applications/:id/approve",

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




if(application.application_status==="Approved"){

return res.status(400)
.json({

message:"Already approved"

});

}





const lastMember =
await OfficialMember.findOne({

order:[
["id","DESC"]
]

});



let nextNumber=1;


if(lastMember){

nextNumber =
lastMember.id + 1;

}



const memberID =
"AAP-CORE-"+
String(nextNumber)
.padStart(5,"0");






await application.update({

application_status:"Approved",

admin_note:req.body.note || ""

});





await OfficialMember.create({

member_id:memberID,

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

});


await sendApprovalEmail(

application.email,

application.full_name,

memberID

);



await ApplicationLog.create({

application_id:
application.id,

admin_id:
req.admin?.id,

action:
"Application Approved",

note:
req.body.note || ""

});






res.json({

success:true,

message:"Application Approved"

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
["createdAt","DESC"]
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
