const QRCode = require("qrcode");


async function generateQR(data){

const qr =
await QRCode.toDataURL(
data,
{
width:300,
margin:2
}
);


return qr;

}


module.exports = generateQR;