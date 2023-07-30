import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

interface JwtExpPayload {
  expiresIn: string;
  exp: number;
  id: string;
} 

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).send({
      status: 401,
      message: "Not authorized, you have no access token",
    });
    return;
    //throw new Error('Not authorized, you have no access token')
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const { id } = jwt.verify(
        token,
        process.env.APP_SECRET || ""
      ) as JwtExpPayload;
      // console.log(id)

        const user = await User.findOne({ id });

      if (!user) {
        throw new Error(`not Authorized`);
      }
    
    //   req.user = user;

      next();
    } catch (error) {
      //   console.log(error)
      res.status(401).send({ error, message: "you are not a valid user" });

      return;
      //   throw new Error(`${error}`)
    }
  }
};
