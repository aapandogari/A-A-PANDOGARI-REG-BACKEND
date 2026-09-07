const AWS = require("aws-sdk");


AWS.config.update({

accessKeyId:
process.env.AWS_ACCESS_KEY_ID,


secretAccessKey:
process.env.AWS_SECRET_ACCESS_KEY,


region:
process.env.AWS_REGION

});



const s3 =
new AWS.S3();



async function uploadFile(
file,
folder
){


const params={


Bucket:
process.env.AWS_BUCKET_NAME,


Key:
`${folder}/${Date.now()}-${file.originalname}`,


Body:
file.buffer,


ContentType:
file.mimetype



};



const result =
await s3.upload(params).promise();



return result.Location;


}



module.exports =
uploadFile;