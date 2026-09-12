const router =
require("express").Router();


const Admin =
require("../models/Admin");


const bcrypt =
require("bcrypt");


const jwt =
require("jsonwebtoken");




// ADMIN LOGIN


router.post(
"/login",

async(req,res)=>{


try{


const {
email,
username,
password
}=req.body;



const loginValue =
email || username;



const admin =
await Admin.findOne({

where:{
[require("sequelize").Op.or]:[
{
email:loginValue
},
{
username:loginValue
}
]
}

});



if(!admin){


return res.status(401)
.json({

success:false,

message:
"Invalid email or password"

});


}





const validPassword =
await bcrypt.compare(

password,

admin.password_hash

);




if(!validPassword){


return res.status(401)
.json({

success:false,

message:
"Invalid email or password"

});

}




const token =
jwt.sign(

{

id:admin.id,

email:admin.email,

role:admin.role

},

process.env.JWT_SECRET,

{

expiresIn:"24h"

}

);





res.json({

success:true,

token,

admin:{

email:admin.email,

role:admin.role

}

});


}


catch(error){


res.status(500)
.json({

message:error.message

});


}


});



module.exports=router;