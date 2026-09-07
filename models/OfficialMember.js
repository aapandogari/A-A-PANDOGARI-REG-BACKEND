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