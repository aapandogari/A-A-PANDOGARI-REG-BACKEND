const { Resend } = require("resend");


const resend =
new Resend(
process.env.RESEND_API_KEY
);



async function sendApprovalEmail(
email,
name,
memberID
){


try{


await resend.emails.send({

from:
"AAP Core Team <noreply@yourdomain.com>",


to:
email,


subject:
"Congratulations! Your AAP Core Team Application Has Been Approved",


html:


`

<h2>
Congratulations ${name}
</h2>


<p>
Your application to join
<b>
AL-AWWAL PANDOGARI ECOSYSTEM
</b>
has been approved.
</p>


<p>
You are now an official Core Team member.
</p>


<h3>
Your Member ID:
${memberID}
</h3>


<p>
Welcome to the team.
</p>


`

});


console.log(
"Approval email sent"
);


}

catch(error){

console.log(
"Email Error:",
error
);

}


}



module.exports =
sendApprovalEmail;
