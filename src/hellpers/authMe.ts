import {NextFunction, Request, Response} from "express";

export const authMe = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
}