/*
AL-AWWAL PANDOGARI ECOSYSTEM
CORE TEAM REGISTRATION ROUTE
AWS S3 SDK V3 READY
*/


const router = require("express").Router();

const multer = require("multer");

const uploadToS3 = require("../services/uploadService");

const CoreTeamApplication =
require("../models/CoreTeamApplication");



console.log(
"===== NEW REGISTRATION ROUTE LOADED (AWS S3 V3) ====="
);



// =====================================
// MULTER CONFIGURATION
// =====================================


const upload = multer({

    storage: multer.memoryStorage(),

    limits: {

        fileSize: 10 * 1024 * 1024

    }

});





// =====================================
// REGISTRATION
// =====================================


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



// =====================================
// UPLOAD FILES TO AWS S3
// =====================================


let selfieUrl = null;

let documentUrl = null;



if(req.files?.selfie){


    selfieUrl = await uploadToS3(

        req.files.selfie[0],

        "selfies"

    );


}



if(req.files?.document){


    documentUrl = await uploadToS3(

        req.files.document[0],

        "documents"

    );


}






// =====================================
// APPLICATION ID
// =====================================


const applicationID =

"AAP-APP-" +

Date.now()
.toString()
.slice(-8);






// =====================================
// NEXT OF KIN
// =====================================


let nextOfKin = {};



try{


nextOfKin = JSON.parse(

req.body.nextOfKin || "{}"

);


}

catch(error){


console.log(
"NEXT OF KIN JSON ERROR:",
error.message
);


}








// =====================================
// TEAM ID
// =====================================


let teamID = 3;



if(req.body.team === "PI_CORE_TEAM"){

teamID = 1;

}


else if(req.body.team === "SIDRA_CORE_TEAM"){

teamID = 2;

}









// =====================================
// SAVE APPLICATION
// =====================================


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

teamID,



team_username:

req.body.piUsername

||

req.body.sidraUsername

||

req.body.username

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



selfie_url:

selfieUrl,



identity_document_url:

documentUrl,



next_of_kin:

nextOfKin,



application_status:

"Pending"


});







console.log(

"APPLICATION SAVED:",

application.application_id

);






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