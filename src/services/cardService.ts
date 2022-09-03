import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";
import { cardSchema } from "../schemas/cardSchema";
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import { findByTypeAndEmployeeId, insert } from "../repositories/cardRepository";
import type { TransactionTypes, CardInsertData } from "../repositories/cardRepository";

export async function validationCardSchema(schema: object) {
    const validation = cardSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function existApiCompany(apiKey: any) { 
    const company: object = await findByApiKey(apiKey);

    if(!company) { 
        throw { code: "Not Found", message: "These Api Key don't makes reference to a company in the database"}
    }
} 

export async function exitEmployee(id: number) {
    const employee: object = await findById(id); 

    if(!employee) { 
        throw { code: "Not Found", message: "These employee aren't registreted in database"}
    } 

    return employee;
} 

export async function oneCardPerTypeForEmployeer(type: TransactionTypes, employeeId: number) { 
    const verify: object = await findByTypeAndEmployeeId(type,employeeId);
     
    if(verify) { 
        throw { code: "Bad Request", message: "This employeer already have a card with that type, he can have only on per type"};
    }
}

export async function shortenEmployeeName(name:string) {
    const brokenName: string[] = name.split(" ");
    let shortenName: string = `${brokenName[0]} `;

    for(let i=1; i<brokenName.length-1; i++) { 
        if(brokenName[i].length>=3) { 
            shortenName += `${brokenName[i][0]} `;
        }
    } 

    shortenName+= brokenName[brokenName.length-1];
    return shortenName.toUpperCase();
} 

export async function experiesDate() {
    const nowBr = dayjs().locale("pt-br");
    const hoje: string = nowBr.format("MM/YYYY");
    
    let experiesIn: number | string = Number(hoje.substring(3,7)) + 5;
    experiesIn = `${hoje.substring(0,2)}/${experiesIn}`
    return experiesIn;
}

export async function cvcCripted() { 
    let cvc: number | string = Number(faker.random.numeric(3));
    const cryptr = new Cryptr('myTotallySecretKey');

    cvc = cryptr.encrypt(`${cvc}`);
    return cvc;
} 

export async function createCards(employeeId:number, number: string, cardholderName: string, securityCode: string, expirationDate: string, isVirtual: boolean, isBlocked: boolean, type: TransactionTypes) {
    const cardData: CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual, 
        isBlocked,
        type
    }
    await insert(cardData);
}