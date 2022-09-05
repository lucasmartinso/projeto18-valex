import { Request, Response } from "express";
import { existApiCompany, exitEmployee, validationCardSchema, shortenEmployeeName, experiesDate, cvcCripted, oneCardPerTypeForEmployeer, createCards } from "../services/createCardService"
import { faker } from '@faker-js/faker';
import { existCardAndExpireDate, validationSecuritySchema, verifyPasswordAndCvc } from "../services/activeCardService";
import { validationPasswordSchema, verifyActiveAndPassword } from "../services/viewCardsService";
import { block, unlock } from "../services/blockAndUnlockCardsService";

export async function createCard(req: Request, res: Response) { 
    const apiKey: string | undefined = req.headers.authorization;
    const { employeeId, type }: any = req.body;
    const cardNumber: number | string = faker.random.numeric(16);

    await validationCardSchema(req.body);
    await existApiCompany(apiKey);
    const employee: any = await exitEmployee(employeeId);
    await oneCardPerTypeForEmployeer(type,employeeId);
    const shortenName: string = await shortenEmployeeName(employee.fullName);
    const experiesDateCard: string = await experiesDate();
    const cvc: number | string = await cvcCripted();
    await createCards(employeeId,cardNumber,shortenName,cvc,experiesDateCard,true,true,type);
    return res.sendStatus(201);
} 

export async function activeCard(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const { cvc, password } : any = req.body;

    await validationSecuritySchema(req.body);
    await existCardAndExpireDate(id);
    await verifyPasswordAndCvc(id,Number(cvc),Number(password));
    return res.sendStatus(200);
}

export async function getCard(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const { password } : any = req.body;

    await validationPasswordSchema(req.body);
    await existCardAndExpireDate(id);
    const consultCards: object = await verifyActiveAndPassword(id,Number(password));
    return res.status(200).send(consultCards);
} 

export async function balanceAndDeal(req: Request, res: Response) { 
    
}

export async function blockCard(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const { password } : any = req.body;

    await validationPasswordSchema(req.body);
    await existCardAndExpireDate(id);
    await verifyActiveAndPassword(id,Number(password));
    await block(id);
    return res.sendStatus(200);
}  

export async function unlockCard(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const { password } : any = req.body;

    await validationPasswordSchema(req.body);
    await existCardAndExpireDate(id);
    await verifyActiveAndPassword(id,Number(password));
    await unlock(id);
    return res.sendStatus(200);
} 