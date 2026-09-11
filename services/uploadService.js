const {
PutObjectCommand
} = require("@aws-sdk/client-s3");


const s3 =
require("../config/s3");


async function uploadToS3(file, folder){

try{


const key =
`${folder}/${Date.now()}-${file.originalname}`;



await s3.send(

new PutObjectCommand({

Bucket:
process.env.AWS_BUCKET_NAME,

Key:key,

Body:file.buffer,

ContentType:file.mimetype

})

);



return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;



}

catch(error){

console.log(
"AWS S3 Upload Error:",
error
);

throw error;

}


}


module.exports = uploadToS3;