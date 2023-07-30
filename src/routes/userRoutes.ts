import express from "express";
import userController from "../controller/userController";

const router = express.Router();

router.post("/add-user", userController.userDetails);
export default router;
