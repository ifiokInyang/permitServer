import express, { Request, Response } from "express";
import { sendgridEmail } from "../utils/notification";
import User from "../model/userModel";

const userDetails = async (req: Request, res: Response) => {
  try {
      const { fName, phone, email } = req.body;
      const newUser = User.create({
        fName,
        phone,
        email,
      });

      const message =
        "Thank you for reaching us, we'll update you with our discounted offerings";
       sendgridEmail(email, fName, message);
       return res.status(200).json({
         message:
           "Thank you for signing up.",
       });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /add-user",
      error,
    });
  }
};
export default {
  userDetails,
};
