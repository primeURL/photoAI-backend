import express from "express";
import { generateImages, trainModel } from "../controller/ai-train-generate";

const router = express.Router();

// route - /api/v1/ai/train/
router.post("/train", trainModel);

// route - /api/v1/ai/generate
router.post("/generate", generateImages);


export default router;