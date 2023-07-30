import express from "express";
import permitController from "../controller/permitController"

const router = express.Router()


router.post("/create", permitController.CreatePermit)
export default router;