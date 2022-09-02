import { Request, Response, NextFunction } from "express";

export async function authApiKey(req: Request,res: Response,next: NextFunction) { 
    const apiKey: any = req.headers.authorization;

    if(!apiKey) { 
        return res.sendStatus(401);
    }
    next();
}