import express, { Request, Response } from "express";
import { sendgridEmail } from "../utils/notification";
import { option, loadSchema } from "../utils/validation";
import UserLoad from "../model/loadModel";

const processLoad = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      company,
      phone,
      address,
      bulb,
      fan,
      tv,
      computer,
      refrigerator,
      freezer,
      ac,
      otherLoads,
    } = req.body;
    const validateResult = loadSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    const newLoad = await UserLoad.create({
      email,
      firstName,
      lastName,
      company,
      phone,
      address,
      bulb,
      fan,
      tv,
      computer,
      refrigerator,
      freezer,
      ac,
      otherLoads,
    });

    const message =
      "We have received your load request and we will respond to you shortly about your quotation.";
    sendgridEmail(email, firstName, message);
    return res.status(200).json({
      message:
        "We have received your information, Kindly check your mail for a follow-up on your quote.",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /get-loads",
      error,
    });
  }
};


export default {
  processLoad,
};
