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


timestamps:true,


createdAt:"created_at",

updatedAt:"updated_at"


}


);



module.exports=Admin;