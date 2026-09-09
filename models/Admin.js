const {DataTypes}=require("sequelize");

const sequelize=require("../config/database");


const Admin=sequelize.define(

"Admin",

{

id:{

type:DataTypes.INTEGER,

autoIncrement:true,

primaryKey:true

},


username:{

type:DataTypes.STRING,

unique:true,

allowNull:false

},


email:{

type:DataTypes.STRING,

unique:true,

allowNull:false

},


password_hash:{

type:DataTypes.TEXT,

allowNull:false

},


role:{

type:DataTypes.STRING,

defaultValue:"ADMIN"

}


},


{

tableName:"admins",

timestamps:true

}


);

const PORT =
process.env.PORT || 5000;


module.exports=Admin;