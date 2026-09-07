const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


const CoreTeamApplication = sequelize.define(

"CoreTeamApplication",

{


id:{

type:DataTypes.INTEGER,

autoIncrement:true,

primaryKey:true

},



application_id:{

type:DataTypes.STRING,

unique:true,

allowNull:false

},



full_name:{

type:DataTypes.STRING,

allowNull:false

},



date_of_birth:{

type:DataTypes.DATEONLY

},



gender:{

type:DataTypes.STRING

},



country:{

type:DataTypes.STRING

},



state:{

type:DataTypes.STRING

},



address:{

type:DataTypes.TEXT

},



phone:{

type:DataTypes.STRING

},



email:{

type:DataTypes.STRING

},



team_id:{

type:DataTypes.INTEGER

},



team_username:{

type:DataTypes.STRING

},



username_type:{

type:DataTypes.STRING

},



preferred_role:{

type:DataTypes.STRING

},



skills:{

type:DataTypes.TEXT

},



experience:{

type:DataTypes.TEXT

},



contribution:{

type:DataTypes.TEXT

},



selfie_url:{

type:DataTypes.TEXT

},



identity_document_url:{

type:DataTypes.TEXT

},



next_of_kin:{

type:DataTypes.JSONB

},



application_status:{

type:DataTypes.STRING,

defaultValue:"Pending"

},



admin_note:{

type:DataTypes.TEXT

}


},


{

tableName:"core_team_applications",

timestamps:true

}

);


module.exports = CoreTeamApplication;