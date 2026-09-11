const router =
require("express").Router();


const Member =
require("../models/OfficialMember");


const generateQR =
require("../utils/qrGenerator");




// GET MEMBER PROFILE


router.get(
"/:memberID",

async(req,res)=>{


try{


const member =
await Member.findOne({

memberID:
req.params.memberID

});



if(!member){

return res.status(404)
.json({

message:
"Member not found"

});

}



res.json(member);



}

catch(error){


res.status(500)
.json({

message:error.message

});


}



});







// GENERATE MEMBER QR


router.post(
"/generate-card/:id",

async(req,res)=>{


try{


const member =
await Member.findById(
req.params.id
);



const verifyURL =

`https://aapecosystem.com/verify/${member.memberID}`;



const qrCode =
await generateQR(
verifyURL
);



member.qrCode =
qrCode;


member.verified =
true;



await member.save();



res.json({

message:
"Membership Card Generated",

member

});


}


catch(error){


res.status(500)
.json({

message:error.message

});


}


});



module.exports =
router;