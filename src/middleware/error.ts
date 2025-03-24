import { Request, Response, NextFunction } from "express"
import ErrorHandler from "../utils/utility-class.js";


export const routeNotFoundMiddleware =  (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
      success : false,
      message : 'Route not found'
    })
  }

export const errorMiddleWare = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

