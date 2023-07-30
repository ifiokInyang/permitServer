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

export const emailHtml = (firstName: string, message: string): string => {
  let response = `
    <div style="max-width:700px;
    margin:auto;
    border:10px solid #ddd;
    padding:50px 20px;
    font-size: 110%;
    font-style: italics
    "> 
    <h2 style="text-align:center;
    text-transform:uppercase;
    color:#c89116;
    ">
    Mitaka Trade Africa Company Ltd.
    </h2>

    <p>Dear ${firstName}, thank you for choosing Mitaka Trade Company.</p>
    <p><strong>${message}</strong></p>
     
    <p>Best,</p>
    
    <div style="display:flex;">
      <div style="margin-right:100px">
              M: <a href="tel:+2348038384141" style="color: #333333; text-decoration: none;">+234-803-838-4141</a><br>
              T: <a href="tel:091MITAKA" style="color: #333333; text-decoration: none;">091MITAKA (0913 612 6191)</a><br>
              E: <a href="mailto:admin@mitakatradeafrica.com" style="color: #333333; text-decoration: none;">admin@mitakatradeafrica.com</a><br>
              W: <a href="http://www.mitakatradeafrica.com" style="color: #333333; text-decoration: none;">www.mitakatradeafrica.com</a><br><br>
      
       Plot 3b, Oko Awo Street,<br>
        Victoria Island, Lagos.<br><br>
              </div>
      <div>
          <img src="cid:companyLogo" alt="Company Logo" style="display:block; margin:auto; max-width: 200px; height: auto; margin-bottom: 20px;"/>

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
  message: string
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to: `${email}`,
    from: `${process.env.ADMIN_MAIL!}`,
    subject: "Thank you for reaching out to Mitaka",
    text: "Invest now and save 10 year upfront mainenance cost.",
    html: `${emailHtml(firstName, message)}`,
    attachments: [
      {
        filename: "mitaka-logo.jpg",
        content: logoBase64,
        type: "image/jpg",
        disposition: "inline",
        content_id: "companyLogo",
      },
    ],
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
