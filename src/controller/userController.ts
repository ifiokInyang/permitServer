import express, { Request, Response } from "express";
import { sendgridEmail } from "../utils/notification";
import User from "../model/userModel";
import { ComparePassword, GeneratePassword, GenerateSalt, loginSchema, option, registerSchema } from "../utils/validation";

const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const validateResult = registerSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    const ExistingUser = await User.findOne({ email })
    
     if (ExistingUser) {
       return res.status(400).json({
         Error: "User already exist!",
       });
     }

    //Generate salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);


    const newUser = User.create({
      name,
      email,
      password: userPassword,
    });

    return res.status(201).json({
      message: "You have successfully signed up to the permit tracking system",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server error /create",
      error,
    });
  }
};


/**==================== Login User ========================**/
const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validateResult = loginSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    //check if the user exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        Error: "Oops!! We couldn't find your credentials in our database, kindly register.",
      });
    }

    const validPassword = await ComparePassword(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        Error: "Invalid credentials",
      });
    }

        return res.status(200).json({
          message: "You have successfully logged in",
        });
      
  
  } catch (err) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/users/login",
      err,
    });
  }
};



export default {
  Register, Login
};
