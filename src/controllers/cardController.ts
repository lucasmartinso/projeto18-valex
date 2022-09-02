import { Request, Response } from "express";
import { existApiCompany, exitEmployee, validationCardSchema } from "../services/cardService"
import { faker } from '@faker-js/faker';

export async function createCard(req: Request, res: Response) { 
    const apiKey: string | undefined = req.headers.authorization;
    const { employeeId  }: any = req.body;
    const cardNumber = faker.random.numeric(16);

    await validationCardSchema(req.body);
    await existApiCompany(apiKey);
    await exitEmployee(employeeId);
    return res.sendStatus(200);
} 
