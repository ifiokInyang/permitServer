import express from "express";
import permitController from "../controller/permitController"

const router = express.Router()


router.post("/create/:id", permitController.CreatePermit)
export default router;