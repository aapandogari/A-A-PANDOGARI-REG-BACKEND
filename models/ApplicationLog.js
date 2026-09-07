const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


const ApplicationLog = sequelize.define(

"ApplicationLog",

{


id:{

type:DataTypes.INTEGER,

autoIncrement:true,

primaryKey:true

},


application_id:{

type:DataTypes.INTEGER,

allowNull:false

},


admin_id:{

type:DataTypes.INTEGER,

allowNull:false

},


action:{

type:DataTypes.STRING,

allowNull:false

},


note:{

type:DataTypes.TEXT

}


},


{

tableName:"application_logs",

timestamps:true

}

);



module.exports = ApplicationLog;