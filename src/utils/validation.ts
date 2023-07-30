import Joi from "joi";
import bcrypt from "bcrypt";
import { AuthPayload } from "../interface/auth.dto";
import jwt, { JwtPayload } from "jsonwebtoken";


export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("email")
    .messages({ "string.only": "{{#label}} must be a valid email" }),
  password: Joi.string().required(),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};


export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
export const ComparePassword = async (inputPassword: string, dbPassword: string) => {
  return await bcrypt.compare(inputPassword, dbPassword);
};

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


export const GenerateSignature = async (payload: AuthPayload) => {
  try {
    return jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw "could not create a token";
  } /*1d means 1 day */
};