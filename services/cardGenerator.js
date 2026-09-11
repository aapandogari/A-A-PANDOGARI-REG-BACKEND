const sharp = require("sharp");
const path = require("path");


async function createCard(data){


const width = 1000;
const height = 600;


// LOGO PATH

const logoPath =
path.join(
process.cwd(),
"assets/logo.png"
);



// FRONT CARD SVG

const front = `

<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">


<defs>

<linearGradient id="bg">

<stop offset="0%" stop-color="#001b1e"/>

<stop offset="100%" stop-color="#07555a"/>

</linearGradient>


</defs>



<rect width="100%" height="100%" fill="url(#bg)"/>



<rect width="100%" height="120"
fill="#f5b700"/>



<text x="50"
y="75"
font-size="42"
font-family="Arial"
fill="#001b1e"
font-weight="bold">

AL-AWWAL PANDOGARI ECOSYSTEM

</text>



<text x="50"
y="160"
font-size="35"
fill="#f5b700"
font-family="Arial">

CORE TEAM MEMBER

</text>



<text x="300"
y="260"
font-size="45"
fill="white"
font-family="Arial">

${data.full_name}

</text>



<text x="300"
y="330"
font-size="30"
fill="white"
font-family="Arial">

Member ID: ${data.member_id}

</text>



<text x="300"
y="390"
font-size="30"
fill="white"
font-family="Arial">

Team: ${data.team}

</text>



<text x="300"
y="450"
font-size="30"
fill="#f5b700"
font-family="Arial">

Role: ${data.role}

</text>



</svg>

`;





// BACK CARD SVG


const back = `

<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">


<rect width="100%" height="100%"
fill="#001b1e"/>



<rect width="100%"
height="100"
fill="#f5b700"/>



<text x="50"
y="65"
font-size="40"
font-family="Arial"
fill="#001b1e"
font-weight="bold">

AAP OFFICIAL VERIFICATION

</text>




<text x="50"
y="180"
font-size="30"
fill="white"
font-family="Arial">

Scan QR Code to verify membership

</text>



<text x="50"
y="300"
font-size="28"
fill="white"
font-family="Arial">

Chief Executive Officer

</text>



<text x="50"
y="350"
font-size="30"
fill="#f5b700"
font-family="Arial">

AAP ECOSYSTEM

</text>



<text x="50"
y="430"
font-size="25"
fill="white"
font-family="Arial">

CEO Contact:

+234 XXX XXX XXXX

</text>



</svg>

`;




const frontBuffer =
await sharp(
Buffer.from(front)
)
.png()
.toBuffer();



const backBuffer =
await sharp(
Buffer.from(back)
)
.png()
.toBuffer();



return {

front:frontBuffer,

back:backBuffer

};



}



module.exports = createCard;