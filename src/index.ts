import express, { Response, Request } from "express";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";

import dotenv from 'dotenv';
import loadRoutes from "./routes/loadRoute";
import userRoutes from "./routes/userRoutes";
const cookieParser = require("cookie-parser");

dotenv.config()

const app = express()


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));

//ROUTES

app.use("/api/loads", loadRoutes);
app.use("/api/users", userRoutes);


(async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!, () => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
})();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "api is running",
  });
});

const PORT = process.env.PORT || 4245;

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});

export default app;