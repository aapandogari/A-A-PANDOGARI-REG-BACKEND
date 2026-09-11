const router =
require("express").Router();


const CoreTeamApplication =
require("../models/CoreTeamApplication");



router.get(

"/:applicationID",

async(req,res)=>{


try{


const application =

await CoreTeamApplication.findOne({

where:{

application_id:
req.params.applicationID

}

});



if(!application){

return res.status(404)
.json({

message:
"Application not found"

});

}



res.json({

name:
application.full_name,


status:
application.application_status,


note:
application.admin_note


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