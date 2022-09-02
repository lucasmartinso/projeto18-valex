import { Request, Response, NextFunction } from "express"; 

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) { 
    console.log(error); 
    if(error.code === "Unprocessable Entity") { 
        return res.status(422).send(error.message);
    } else if(error.code === "Not Found") { 
        return res.sendStatus(404).send(error.message);
    }
    res.sendStatus(500);
}