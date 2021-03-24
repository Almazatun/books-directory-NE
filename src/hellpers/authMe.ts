import {NextFunction, Request, Response} from "express";
import {SESSION} from "../configs/session";

export const authMe = (req: Request, res: Response, next: NextFunction) => {
    const {cookies} = req
    if ("cls" in cookies ) {
        if (cookies.cls === SESSION){
            next()
        } else {
            res.status(401).json({message: "🔴 Unauthorized"});
        }
    } else {
        res.status(401).json({message: "🔴 Unauthorized"});
    }
}