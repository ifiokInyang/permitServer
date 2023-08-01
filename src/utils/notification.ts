import { FromAdminMail, userSubject } from "../Config";
const sgMail = require("@sendgrid/mail");
const logoPath = "src/view/mitaka-logo.jpg";

import fs from "fs";

const encodeImageToBase64 = (filePath: string): string => {
  const imageBuffer = fs.readFileSync(filePath);

  const base64String = imageBuffer.toString("base64");

  return base64String;
};
const logoBase64 = encodeImageToBase64(logoPath);

export const emailHtml = (firstName: string, title: string, nextRenewalDate: string): string => {
  let response = `
    <div style="max-width:700px;
    margin:auto;
    border:10px solid #ddd;
    padding:50px 20px;
    font-size: 110%;
    font-style: italics
    "> 

    <p>Dear ${firstName},</p>
    <p>I hope this message finds you well.</p>
    <p>This is a friendly reminder that your ${title} permit is due for renewal in just 30 days.</p>
    <p>Ensuring the timely renewal of your permit is crucial to maintaining compliance and ensuring a seamless continuation of operations.</p>
     <p>Kindly take proactive action to complete the renewal process before ${nextRenewalDate} to avoid any disruptions or unnecessary delays.</p>
    
    <p>If you have already renewed this permit, kindly update the renewal status by closing it out on the permit portal using your login details.</p>
    <p>Note: please don't reply to this mail as this account is not monitored.</p>

     
    <p>Best regards,</p>
    
    <div style="display:flex;">
      <div style="margin-right:100px">
              <p> HSE Support Team,</p>
                  <p>Supply Base East.</p>
              </div>
      <div>

      <p>Achieving Goal Zero through timely compliance.</p>

<p>Confidentiality Notice: This email and any attachments are intended solely for the use of the individual or entity to whom it is addressed. If you have received this communication in error, please notify the sender immediately and delete the email from your system. Any unauthorized disclosure, copying, or distribution of this email is strictly prohibited.</p>

      </div>
    </div>
       
    </div>
    
    `;
  return response;
};

//Send grid

export const sendgridEmail = (
  email: string,
  firstName: string,
  title: string,
  nextRenewalDate: string
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to: `${email}`,
    from: `${process.env.ADMIN_MAIL!}`,
    subject: "PERMIT EXPIRING SOON",
    text: "PERMIT EXPIRING SOON",
    html: `${emailHtml(firstName, title, nextRenewalDate)}`,
    // attachments: [
    //   {
    //     filename: "mitaka-logo.jpg",
    //     content: logoBase64,
    //     type: "image/jpg",
    //     disposition: "inline",
    //     content_id: "companyLogo",
    //   },
    // ],
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error.response.body);
    });
};
