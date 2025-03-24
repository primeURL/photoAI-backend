import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/utility-class";
import { prismaClient } from "../db";
import { TrainModel } from "../utils/types";
import { FalAIModel } from "../models/FalAIModel";

const falAiModel = new FalAIModel();
// To Train AI Model
export const trainModel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = TrainModel.safeParse(req.body);
    if (!parsedBody.success) {
      return next(new ErrorHandler({
        message: "Input incorrect",
        error: parsedBody.error,
      },411))
    }

    const { request_id, response_url } = await falAiModel.trainModel(
      parsedBody.data.zipUrl,
      parsedBody.data.name
    );

    const data = await prismaClient.model.create({
      data: {
        name: parsedBody.data.name,
        type: parsedBody.data.type,
        age: parsedBody.data.age,
        ethinicity: parsedBody.data.ethinicity,
        eyeColor: parsedBody.data.eyeColor,
        bald: parsedBody.data.bald,
        userId: '123',
        zipUrl: parsedBody.data.zipUrl,
        falAiRequestId: request_id,
      },
    });

    res.json({
      modelId: data.id,
    });
  } catch (error) {
    console.error("Error in /ai/training:", error);
    return next(new ErrorHandler({
          message: "Training Failed",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500));
    // res.status(500).json({
    //   message: "Training failed",
    //   error: error instanceof Error ? error.message : "Unknown error",
    // });
  }
};

export const generateImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
