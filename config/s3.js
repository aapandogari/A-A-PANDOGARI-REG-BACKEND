/*
AL-AWWAL PANDOGARI ECOSYSTEM
AWS S3 CONNECTION - SDK V3
*/

const { S3Client } = require("@aws-sdk/client-s3");


const s3 = new S3Client({

    region: process.env.AWS_REGION,

    credentials: {

        accessKeyId:
        process.env.AWS_ACCESS_KEY_ID,


        secretAccessKey:
        process.env.AWS_SECRET_ACCESS_KEY

    }

});


console.log("AWS S3 V3 CLIENT READY");


module.exports = s3;