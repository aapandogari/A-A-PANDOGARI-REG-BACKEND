const multer = require("multer");


const storage = multer.memoryStorage();



const upload = multer({

storage: storage,


limits: {

fileSize: 5 * 1024 * 1024 // 5MB

},



fileFilter: (req, file, cb) => {


const allowedTypes = [

"image/jpeg",

"image/png",

"image/jpg",

"application/pdf"

];



if (allowedTypes.includes(file.mimetype)) {

cb(null, true);

} else {

cb(
new Error(
"Only JPG, PNG images and PDF files are allowed"
),
false
);

}


}


});



module.exports = upload;