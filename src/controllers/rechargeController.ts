import { Request, Response } from "express";
import { existCardAndExpireDate } from "../services/activeCardService";
import { existApiCompany } from "../services/createCardService";
import { rechargeCard, validationRechargeSchema, verifyCardInfo } from "../services/rechargeService";

export async function recharge(req: Request, res: Response) { 
    const apiKey: string | undefined = req.headers.authorization;
    const id: number = Number(req.params.id);
    const amount: number = Number(req.body.amount);

    await existApiCompany(apiKey);
    await validationRechargeSchema(req.body);
    await verifyCardInfo(id);
    await rechargeCard(id,amount);
    
    return res.sendStatus(200);
}