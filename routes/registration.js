const router = require("express").Router();

const multer = require("multer");

const CoreTeamApplication =
require("../models/CoreTeamApplication");


const storage = multer.diskStorage({

destination(req,file,cb){

cb(null,"uploads/");

},

filename(req,file,cb){

cb(
null,
Date.now()+"-"+file.originalname
);

}

});


const upload = multer({
storage
});


router.post(

"/",

upload.fields([

{
name:"selfie",
maxCount:1
},

{
name:"document",
maxCount:1
}

]),


async(req,res)=>{


try{


const applicationID =
"AAP-APP-" +
Date.now()
.toString()
.slice(-8);



const nextOfKin =
JSON.parse(
req.body.nextOfKin || "{}"
);



const application =
await CoreTeamApplication.create({

application_id:applicationID,


full_name:
req.body.fullName,


date_of_birth:
req.body.dob,


gender:
req.body.gender,


country:
req.body.country,


state:
req.body.state,


address:
req.body.address,


phone:
req.body.phone,


email:
req.body.email,


team_username:

req.body.piUsername ||
req.body.sidraUsername ||
"",


preferred_role:
req.body.role,


skills:
req.body.skills,


experience:
req.body.experience,


contribution:
req.body.value,


selfie_url:

req.files?.selfie
?
req.files.selfie[0].path
:
null,


identity_document_url:

req.files?.document
?
req.files.document[0].path
:
null,


next_of_kin:nextOfKin,


application_status:"Pending"


});




res.json({

success:true,

message:
"Application submitted successfully",

applicationID:
application.application_id

});



}


catch(error){

console.log(error);


res.status(500).json({

success:false,

message:error.message

});


}


});


module.exports = router;