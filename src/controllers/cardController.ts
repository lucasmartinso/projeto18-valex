import { Request, Response } from "express";
import { existApiCompany, exitEmployee, validationCardSchema, shortenEmployeeName, experiesDate, cvcCripted, oneCardPerTypeForEmployeer, createCards } from "../services/createCardService"
import { faker } from '@faker-js/faker';
import { existCardAndExpireDate, validationSecuritySchema, verifyPasswordAndCvc } from "../services/activeCardService";

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
    return res.sendStatus(200);
} 

export async function activeCard(req: Request, res: Response) { 
    const id: number = Number(req.params.id);
    const { cvc, password } : any = req.body;

    await validationSecuritySchema(req.body);
    await existCardAndExpireDate(id);
    await verifyPasswordAndCvc(id,Number(cvc),Number(password));
    return res.sendStatus(200);
}
