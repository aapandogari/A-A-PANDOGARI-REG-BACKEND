const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


const OfficialMember = sequelize.define(

"OfficialMember",

{


id:{

type:DataTypes.INTEGER,

autoIncrement:true,

primaryKey:true

},



member_id:{

type:DataTypes.STRING,

unique:true,

allowNull:false

},



application_id:{

type:DataTypes.INTEGER,

allowNull:false,

references:{

model:"core_team_applications",

key:"id"

}

},



full_name:{

type:DataTypes.STRING,

allowNull:false

},



team_id:{

type:DataTypes.INTEGER,

references:{

model:"teams",

key:"id"

}

},



username:{

type:DataTypes.STRING

},



role:{

type:DataTypes.STRING

},



selfie_url:{

type:DataTypes.TEXT

},


id_card_front_url:{
type:DataTypes.TEXT
},


id_card_back_url:{
type:DataTypes.TEXT
},


qr_code:{
type:DataTypes.TEXT
},


signature_url:{
type:DataTypes.TEXT
},


issued_date:{
type:DataTypes.DATE,
defaultValue:DataTypes.NOW
},
  

status:{

type:DataTypes.STRING,

defaultValue:"ACTIVE"

}


},


{

tableName:"official_members",

timestamps:true

}

);



module.exports = OfficialMember;