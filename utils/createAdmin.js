/*
AAP CORE TEAM BACKEND
CREATE FIRST ADMIN ACCOUNT
*/


const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");

const sequelize = require("../config/database");



async function createAdmin(){

try{


await sequelize.authenticate();


const existingAdmin =
await Admin.findOne({

where:{
username:"AL-AWWAL PANDOGARI"
}

});


if(existingAdmin){

console.log(
"Admin account already exists"
);

process.exit();

}




const password =
await bcrypt.hash(

"@Auwal123$",

10

);




await Admin.create({

username:
"AL-AWWAL PANDOGARI",

email:
"awwalaymanawwal@gmail.com",

password_hash:
password,

role:
"SUPER_ADMIN"

});



console.log(
"✅ Admin account created successfully"
);


console.log(
"Username: AL-AWWAL PANDOGARI"
);


console.log(
"Password: @Auwal123$"
);



process.exit();


}

catch(error){

console.error(
"❌ Admin creation failed",
error
);


process.exit(1);

}


}



createAdmin();