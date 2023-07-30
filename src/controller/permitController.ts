import express, { Request, Response } from "express";
import { sendgridEmail } from "../utils/notification";
import { option} from "../utils/validation";
import PermitModel from "../model/permitModel";

const CreatePermit = async (req: Request, res: Response) => {
  try {

    const {
       title,
  permitNumber,
  lastRenewalDate,
  nextRenewalDate,
  company,
  description
    } = req.body;
    const { id } = req.params;

    const newLoad = await PermitModel.create({
      title,
      permitNumber,
      lastRenewalDate,
      nextRenewalDate,
      company,
      description,
    });

    // sendgridEmail(ti, firstName, message);
    return res.status(201).json({
      message: "Permit successfully added",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /permits/create",
      error,
    });
  }
};


export default {
  CreatePermit,
};
