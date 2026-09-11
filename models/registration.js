const router =
require("express").Router();


const multer =
require("multer");


const OfficialMember =
require("../models/OfficialMember");





// File Upload Setup


const storage =
multer.diskStorage({

destination:
function(req,file,cb){

cb(null,"uploads/");

},


filename:
function(req,file,cb){

cb(
null,
Date.now()
+
"-"
+
file.originalname
);

}


});



const upload =
multer({
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


const count =
await OfficialMember.countDocuments();


const memberID =
"AAP-CORE-" +
String(count+1)
.padStart(5,"0");





const member =
new Member({


memberID,

...req.body,

nextOfKin:
JSON.parse(req.body.nextOfKin),


selfie:

req.files.selfie
?
req.files.selfie[0].path
:
"",



document:

req.files.document
?
req.files.document[0].path
:
""


});




await member.save();



res.json({

success:true,


message:
"Registration Successful",


memberID


});



}

catch(error){


res.status(500)
.json({

success:false,

message:
error.message

});


}


});





module.exports =
router;