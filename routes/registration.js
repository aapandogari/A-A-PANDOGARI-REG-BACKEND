const fs = require("fs");
const path = require("path");

const router = require("express").Router();

const multer = require("multer");

const CoreTeamApplication =
require("../models/CoreTeamApplication");

const uploadDir = path.join(__dirname, "../uploads");


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({

destination(req,file,cb){

cb(null, uploadDir);

},

filename(req, file, cb){

cb(
null,
Date.now() + "-" + file.originalname
);

}

});


const upload = multer({
storage
});


console.log("===== NEW REGISTRATION ROUTE LOADED =====");


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


async (req, res) => {


try {


console.log("REGISTRATION BODY:", req.body);

console.log("REGISTRATION FILES:", req.files);



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

application_id: applicationID,


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


team_id:
req.body.team === "PI_CORE_TEAM"
?
1
:
req.body.team === "SIDRA_CORE_TEAM"
?
2
:
3,

  
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


next_of_kin:
nextOfKin,


application_status:
"Pending"


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

console.log("REGISTRATION ERROR:", error);

res.status(500).json({

success:false,

message:"Registration failed",
error:error.message

});

}

});


module.exports = router;