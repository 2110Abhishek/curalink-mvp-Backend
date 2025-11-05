import express from "express";
import { 
  getTrials, 
  createTrial, 
  updateTrial, 
  deleteTrial,
  getTrialById 
} from "../controllers/trialController.js";

const router = express.Router();

router.get("/", getTrials);
router.post("/", createTrial);
router.get("/:id", getTrialById);
router.put("/:id", updateTrial);
router.delete("/:id", deleteTrial);

export default router;