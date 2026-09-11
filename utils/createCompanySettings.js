const CompanySetting =
require("../models/CompanySetting");


async function createCompanySettings(){


const existing =
await CompanySetting.findOne();


if(!existing){


await CompanySetting.create({

ceo_name:
"A-A PANDOGARI",

ceo_phone:
"+2348100760946",

company_email:
"aapandogari@gmail.com",

logo_url:
"/assets/logo.png",

signature_url:
""

});


console.log(
"Company settings created"
);


}


}


module.exports =
createCompanySettings;