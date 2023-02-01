import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"
import { ErrorHandler } from "../errors/error";

export const AuthUser = (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.headers

    if (!access_token) {
        res.json({
            message: "access_token not found",
            status: 404
        })
    }

    verify(access_token, process.env.SECRET_KEY, (err:Error, decoded:any) => {
        if (err) {
            return next(new ErrorHandler(err.message, 400))
        }

        req["userId"] = decoded
        

        next()
    })

}