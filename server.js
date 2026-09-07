/*
AL-AWWAL PANDOGARI ECOSYSTEM
BACKEND SERVER
RAILWAY DEPLOYMENT READY
*/


require("dotenv").config();


const express =
require("express");


const cors =
require("cors");


const path =
require("path");


const sequelize =
require("./config/database");



const app =
express();




// ===============================
// PORT
// ===============================


const PORT =
process.env.PORT || 5000;




// ===============================
// CORS CONFIGURATION
// ===============================


app.use(

cors({

origin:[

process.env.FRONTEND_URL,

"http://localhost:3000",

"http://127.0.0.1:5500"

],


credentials:true


})

);





// ===============================
// BODY PARSER
// ===============================


app.use(
express.json()
);


app.use(

express.urlencoded({

extended:true

})

);




// ===============================
// STATIC FILES
// ===============================


// Keep old uploads working

app.use(

"/uploads",

express.static(

path.join(
__dirname,
"uploads"

)

)

);






// ===============================
// DATABASE
// ===============================


sequelize.authenticate()

.then(()=>{


console.log(
"Database connected successfully"
);



})

.catch(error=>{


console.log(
"Database connection failed",
error
);


});





// ===============================
// ROUTES
// ===============================



app.use(

"/api/core-team",

require("./routes/coreTeam")

);



app.use(

"/api/admin",

require("./routes/admin")

);



app.use(

"/api/auth",

require("./routes/auth")

);



app.use(

"/api/status",

require("./routes/status")

);



app.use(

"/api/member",

require("./routes/member")

);





// ===============================
// TEST ROUTE
// ===============================


app.get("/",(req,res)=>{


res.json({

message:
"AAP Ecosystem Backend Running"

});


});






// ===============================
// SERVER START
// ===============================


app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT}`

);


}

);