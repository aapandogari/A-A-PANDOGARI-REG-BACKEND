const {DataTypes}=require("sequelize");

const sequelize=require("../config/database");


const DigitalCard =
sequelize.define(

"DigitalCard",

{

member_id:{
type:DataTypes.INTEGER,
allowNull:false
},


qr_code:{
type:DataTypes.TEXT
},


card_url:{
type:DataTypes.TEXT
}

},

{

tableName:"digital_cards",

timestamps:true

}

);


module.exports = DigitalCard;