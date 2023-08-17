import express, { Request, Response } from "express";
import { emailHtml, mailSent, sendgridEmail } from "../utils/notification";
import { option } from "../utils/validation";
import PermitModel from "../model/permitModel";
import User from "../model/userModel";
import moment from "moment";
import schedule from "node-schedule";
const cron = require('node-cron');


const CreatePermit = async (req: Request, res: Response) => {
  try {
    const {
      title,
      permitNumber,
      lastRenewalDate,
      nextRenewalDate,
      company,
      description,
    } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    console.log("user is ", user)

    const newPermit = await PermitModel.create({
      title,
      permitNumber,
      lastRenewalDate,
      nextRenewalDate,
      company,
      description,
      userId: id,
    });

    // Send response to the client
    res.status(201).json({
      message: "Permit successfully added",
    });

   
    // Calculate time differences between dates
    const currentDate = moment();
    const nextRenewal = moment(nextRenewalDate);
    const daysDifference = nextRenewal.diff(currentDate, "days");
    const hoursDifference = nextRenewal.diff(currentDate, "hours");
    console.log("hours diff is ", hoursDifference)
        console.log("days diff is ", daysDifference);

    // Schedule email based on the time differences
    // if (daysDifference > 30) {
    //   const reminderDate1 = nextRenewal
    //     .subtract(30, "days")
    //     .format("YYYY-MM-DD");
    //   scheduleEmail(reminderDate1, user?.email!, user?.name!, title);
    // }


console.log("got to this point")
    // Schedule email 23 hours before the next renewal date

    if (hoursDifference >= 7) {
      console.log("i ran 1");
      const reminderDate = nextRenewal
        .subtract(7, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      sEmail(user?.email!);
    }
     if (hoursDifference >= 6) {
       console.log("i ran 2");
       const reminderDate = nextRenewal
         .subtract(6, "hours")
         .format("YYYY-MM-DD HH:mm:ss");
      sEmail(user?.email!);
     }
    if (hoursDifference >= 5) {
      console.log("i ran 3");
      const reminderDate = nextRenewal
        .subtract(5, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      sEmail(user?.email!);
    }
    console.log("i ran 4")
          sEmail(user?.email!);

    // Schedule the email for the exact next renewal date
    const nextRenewalDateString = moment(nextRenewalDate).format("YYYY-MM-DD");
    // scheduleEmail(nextRenewalDateString, user?.email!, user?.name!, title);
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /permits/create",
      error,
    });
  }
};

// Function to schedule email using 'node-schedule'
const scheduleEmail = (
  reminderDate: string,
  email: string,
  name: string,
  title: string,
  num: number
) => {
    // Execute the email sending logic here
  console.log("cron schedule")
     cron.schedule(`0 */2 * * * *`, () => {
       sendgridEmail(
         email,
         name,
         title,
         reminderDate
       );
     });
};

const html = emailHtml("Ifiok", "title", "nextdate")

const sEmail = async (email: string) => {
  cron.schedule(`*/2 * * * *`, async () => {
    console.log("Email sent at", new Date())
    await sendgridEmail(email,"ifiok","Check permit","nextTomorrow")
    //  await mailSent("admin@mitakatradeafrica.com", email, "Permit expiring soon", html)
   });
}

export default {
  CreatePermit,
};
