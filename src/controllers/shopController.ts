import { Request, Response } from "express";
import { validationShoppingSchema, verifyCardAbbleToShopp, verifyEnoughMoney } from "../services/shopService";

export async function shopping(req: Request, res: Response) { 
    const cardId: number = Number(req.params.id);
    const amount: number = Number(req.body.amount);
    const password: number = Number(req.body.password);
    const placeId: number = Number(req.body.placeId);

    await validationShoppingSchema(req.body);
    await verifyCardAbbleToShopp(cardId,password,placeId);
    await verifyEnoughMoney(cardId,amount,placeId);
    
    return res.sendStatus(200);
}