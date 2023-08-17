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
    console.log("user is ", user);

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
    const nextRenewalMoment = moment(
      nextRenewalDate + " 00:00:00",
      "YYYY-MM-DD HH:mm:ss"
    );
    const lastRenewalMoment = moment(
      lastRenewalDate + " 00:00:00",
      "YYYY-MM-DD HH:mm:ss"
    );

    const hoursDifference2 = nextRenewalMoment.diff(lastRenewalMoment, "hours");
    console.log("hours difference is ", hoursDifference2);

    const intervalsHours = [
      hoursDifference2 / 2,
      hoursDifference2 / 4,
      hoursDifference2 / 8,
    ];
    const secondsDifference = nextRenewalMoment.diff(
      lastRenewalMoment,
      "seconds"
    );

    const intervals = [
      secondsDifference / 2,
      secondsDifference / 4,
      secondsDifference / 8,
    ];

    let emailCounter = 0;

    let intervalHandler = setInterval(() => {
      if (emailCounter < intervals.length) {
        const intervalInSeconds = intervals[emailCounter];
        sEmail(user?.email!, nextRenewalDate);
        emailCounter++;

        if (emailCounter === 1) {
          clearInterval(intervalHandler); // Clear the interval after the first email
          setTimeout(() => {
            intervalHandler = setInterval(() => {
              if (emailCounter < intervals.length) {
                sEmail(user?.email!, nextRenewalDate);
                emailCounter++;
              } else {
                clearInterval(intervalHandler);
                console.log("Email sending has stopped");
              }
            }, intervalInSeconds * 1000); // Convert to milliseconds
          }, (intervalInSeconds * 1000) / 2); // Wait half of the interval before setting up the next interval
        }
      } else {
        console.log("Email sending has stopped");
      }
    }, 0); // Immediate execution after intervalHandler is cleared
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /permits/create",
      error,
    });
  }
};

// Function to schedule email using 'node-schedule'

const html = emailHtml("Ifiok", "title", "nextdate")

const sEmail = async (email: string, renewalDate: string) => {
    console.log("email function triggered");
  sendgridEmail(email, "Ifiok", "Expiry", renewalDate)
  console.log("line after email function triggered")
}

export default {
  CreatePermit,
};
