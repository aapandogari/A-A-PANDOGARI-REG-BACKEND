const sharp = require("sharp");


async function createCard(data){


const width = 1000;
const height = 600;



const svg = `

<svg width="${width}" height="${height}"
xmlns="http://www.w3.org/2000/svg">


<rect width="100%" height="100%" fill="#ffffff"/>


<rect width="100%" height="120"
fill="#6d28d9"/>


<text x="50"
y="70"
font-size="45"
fill="white"
font-family="Arial">
AL-AWWAL PANDOGARI ECOSYSTEM
</text>



<text x="50"
y="200"
font-size="40"
font-family="Arial">
${data.full_name}
</text>



<text x="50"
y="270"
font-size="30"
font-family="Arial">
Member ID: ${data.member_id}
</text>



<text x="50"
y="330"
font-size="30"
font-family="Arial">
Team: ${data.team}
</text>



<text x="50"
y="390"
font-size="30"
font-family="Arial">
Role: ${data.role}
</text>



</svg>

`;



const buffer =
await sharp(
Buffer.from(svg)
)
.png()
.toBuffer();



return buffer;


}


module.exports = createCard;