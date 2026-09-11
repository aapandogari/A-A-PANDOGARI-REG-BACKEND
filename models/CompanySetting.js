const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


const CompanySetting = sequelize.define(

"CompanySetting",

{

id:{

type:DataTypes.INTEGER,
autoIncrement:true,
primaryKey:true

},


company_name:{

type:DataTypes.STRING,
defaultValue:
"AL-AWWAL PANDOGARI ECOSYSTEM"

},


ceo_name:{

type:DataTypes.STRING,
allowNull:false

},


ceo_phone:{

type:DataTypes.STRING,
allowNull:false

},


company_email:{

type:DataTypes.STRING

},


signature_url:{

type:DataTypes.TEXT

},


logo_url:{

type:DataTypes.TEXT

},


primary_color:{

type:DataTypes.STRING,
defaultValue:"#f5b700"

},


secondary_color:{

type:DataTypes.STRING,
defaultValue:"#001b1e"

}


},

{
    tableName:"company_settings",
    timestamps:true,

    createdAt:"created_at",
    updatedAt:"updated_at"
}


);


module.exports = CompanySetting;