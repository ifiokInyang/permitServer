import express from "express";
import userController from "../controller/userController";

const router = express.Router();

router.post("/create", userController.Register);
router.post("/login", userController.Login);

export default router;
