const router = require("express").Router();

const multer = require("multer");

const OfficialMember =
require("../models/OfficialMember");


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


const total =
await OfficialMember.count();


const memberID =
"AAP-CORE-" +
String(total+1)
.padStart(5,"0");



const nextOfKin =
JSON.parse(
req.body.nextOfKin || "{}"
);



const member =
await OfficialMember.create({

member_id:memberID,

full_name:req.body.fullName,

username:
req.body.piUsername ||
req.body.sidraUsername,

role:req.body.role,

selfie_url:
req.files?.selfie
?
req.files.selfie[0].path
:
null,


status:"ACTIVE"

});



res.json({

success:true,

message:"Registration Successful",

applicationID:member.id,

memberID

});


}


catch(error){


console.log(error);


res.status(500)
.json({

success:false,

message:error.message

});


}


});


module.exports = router;