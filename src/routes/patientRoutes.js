import express from "express";
import { saveProfile, getProfile, analyzeCondition } from "../controllers/patientController.js";

const router = express.Router();
router.post("/profile", saveProfile);
router.get("/profile/:userId", getProfile);
router.post("/analyze", analyzeCondition);

export default router;
