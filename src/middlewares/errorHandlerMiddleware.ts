import { Request, Response, NextFunction } from "express"; 

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) { 
    console.log(error); 
    res.sendStatus(500);
}