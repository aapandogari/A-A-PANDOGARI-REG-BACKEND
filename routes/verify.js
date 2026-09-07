const router =
require("express").Router();


const OfficialMember =
require("../models/OfficialMember");



router.get(

"/:memberID",

async(req,res)=>{


const member =

await OfficialMember.findOne({

where:{

member_id:
req.params.memberID

}

});



if(!member){

return res.status(404)
.json({

message:
"Invalid Member ID"

});

}



res.json({

verified:true,


name:
member.full_name,


team:
member.team_id,


role:
member.role,


member_id:
member.member_id


});


});


module.exports=router;