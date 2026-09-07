const router = require("express").Router();

const CoreTeamApplication =
require("../models/CoreTeamApplication");

const upload =
require("../middleware/upload");

const cloudinary =
require("../config/cloudinary");



// ===============================
// CLOUDINARY UPLOAD FUNCTION
// ===============================

function uploadToCloudinary(file, folder){

return new Promise((resolve,reject)=>{


const stream =
cloudinary.uploader.upload_stream(

{

folder:folder,

resource_type:"auto"

},

(error,result)=>{

if(error){

reject(error);

}

else{

resolve(result.secure_url);

}

}

);



stream.end(file.buffer);


});


}




// ===============================
// CORE TEAM REGISTRATION
// ===============================


router.post(

"/apply",

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


const body =
req.body;



let selfieURL = "";

let documentURL = "";




// Upload selfie

if(
req.files &&
req.files.selfie
){


selfieURL =
await uploadToCloudinary(

req.files.selfie[0],

"aap/core-team/selfies"

);


}




// Upload document

if(
req.files &&
req.files.document
){


documentURL =
await uploadToCloudinary(

req.files.document[0],

"aap/core-team/documents"

);


}







// Generate application ID


const applicationID =

"AAP-APP-"+
Date.now();





const application =

await CoreTeamApplication.create({

application_id:
applicationID,


full_name:
body.fullName,


date_of_birth:
body.dob,


gender:
body.gender,


country:
body.country,


state:
body.state,


address:
body.address,


phone:
body.phone,


email:
body.email,



team_id:

body.team==="PI_CORE_TEAM"
?
1
:
body.team==="SIDRA_CORE_TEAM"
?
2
:
3,



team_username:

body.piUsername ||
body.sidraUsername ||
body.username,



username_type:

body.team==="PI_CORE_TEAM"
?
"PI_USERNAME"
:
"SIDRA_USERNAME",



preferred_role:
body.role,



skills:
body.skills,


experience:
body.experience,


contribution:
body.value,



selfie_url:
selfieURL,


identity_document_url:
documentURL,



next_of_kin:

JSON.parse(
body.nextOfKin || "{}"
),


application_status:
"Pending"


});





res.json({

success:true,


message:
"Registration submitted successfully",


applicationID:
application.application_id


});


}



catch(error){


console.log(error);



res.status(500)
.json({

success:false,

message:
error.message

});


}



});




module.exports = router;