import { Request, Response } from "express";
import { existApiCompany, validationCardSchema } from "../services/cardService"

export async function createCard(req: Request, res: Response) { 
    const apiKey: string | undefined = req.headers.authorization;

    await validationCardSchema(req.body);
    await existApiCompany(apiKey);
    
    return res.sendStatus(200);
} 
