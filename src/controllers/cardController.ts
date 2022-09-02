import { Request, Response } from "express";

export async function createCard(req: Request, res: Response) { 
    const apiKey: any = req.headers.authorization;
    console.log("Bom dia");
    return res.sendStatus(200);
}