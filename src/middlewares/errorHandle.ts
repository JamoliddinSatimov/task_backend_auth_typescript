import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/error";

export const errorHandle = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status).json({
        message: err.message,
        status: err.status
    })
}