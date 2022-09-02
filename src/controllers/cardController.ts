import { Request, Response } from "express";
import { createCardService } from "../services/cardService"

export async function createCard(req: Request, res: Response) { 
    const apiKey: any = req.headers.authorization;
    await createCardService(req.body);
    return res.sendStatus(200);
}