
const QRCode =
require("qrcode");


async function createQR(data){


return await QRCode.toDataURL(data);


}


module.exports=createQR;