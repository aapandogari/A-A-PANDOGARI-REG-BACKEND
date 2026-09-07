const bcrypt =
require("bcrypt");


const Admin =
require("../models/Admin");


const sequelize =
require("../config/database");





async function createAdmin(){


await sequelize.sync();



const password =
await bcrypt.hash(

"CHANGE_THIS_PASSWORD",

10

);




await Admin.create({

username:
"admin",

password_hash:
password,


role:
"SUPER_ADMIN"

});



console.log(
"Admin account created"
);


process.exit();


}




createAdmin();
