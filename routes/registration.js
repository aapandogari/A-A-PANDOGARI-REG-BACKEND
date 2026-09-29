/*
AL-AWWAL PANDOGARI ECOSYSTEM
CORE TEAM REGISTRATION ROUTE
AWS S3 READY
*/


const router =
require("express").Router();


const multer =
require("multer");


const multerS3 =
require("multer-s3");


const s3 =
require("../config/s3");


const CoreTeamApplication =
require("../models/CoreTeamApplication");



console.log(
"===== NEW REGISTRATION ROUTE LOADED (AWS S3) ====="
);





// ===============================
// AWS S3 UPLOAD CONFIGURATION
// ===============================


const upload = multer({

storage:

multerS3({

s3:s3,


bucket:
process.env.AWS_BUCKET_NAME,



metadata:(req,file,cb)=>{


cb(null,{

fieldName:
file.fieldname

});


},




key:(req,file,cb)=>{


let folder;



if(file.fieldname==="selfie"){

folder="selfies/";

}

else{

folder="documents/";

}




const fileName =

folder +

Date.now() +

"-" +

file.originalname.replace(/\s+/g,"-");



cb(null,fileName);



},



contentType:

multerS3.AUTO_CONTENT_TYPE



})


});







// ===============================
// REGISTRATION
// ===============================



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



console.log(
"REGISTRATION BODY:",
req.body
);



console.log(
"REGISTRATION FILES:",
req.files
);






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





application_id:

applicationID,





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

req.body.piUsername

||

req.body.sidraUsername

||

"",







preferred_role:

req.body.role,





skills:

req.body.skills,





experience:

req.body.experience,





contribution:

req.body.value,









// AWS S3 URL

selfie_url:


req.files?.selfie

?

req.files.selfie[0].location

:

null,








identity_document_url:


req.files?.document

?

req.files.document[0].location

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



console.log(

"REGISTRATION ERROR:",

error

);



res.status(500).json({



success:false,



message:

"Registration failed",



error:

error.message



});



}



}





);



module.exports = router;