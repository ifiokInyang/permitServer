import express from "express";
import loadController from "../controller/permitController"

const router = express.Router()


router.post("/get-load", loadController.processLoad)
export default router;