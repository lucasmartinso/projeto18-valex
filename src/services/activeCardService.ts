import Cryptr from 'cryptr';
import { findById, update } from '../repositories/cardRepository';
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
import { securityCardSchema } from "../schemas/cardSchema";

export async function validationSecuritySchema(schema: object) {
    const validation = securityCardSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function existCardAndExpireDate(id: number) { 
    const cardInfo: any = await findById(id);
    
    if(!cardInfo) { 
        throw { code: "Not Found", message: "These card id aren't registreted in database"}
    } 

    const cardDate: any = cardInfo.expirationDate;
    const nowBr = dayjs().locale("pt-br");
    const hoje: string = nowBr.format("MM/YY");

    if(Number(hoje.substring(3,5)) > Number(cardDate.substring(3,5)) || (Number(hoje.substring(3,5)) === Number(cardDate.substring(3,5)) && Number(hoje.substring(0,2)) > Number(cardDate.substring(0,2)))) { 
        throw { code: "Bad Request", message: "This card already have experited"};
    }

    return cardInfo;
}  

export async function verifyPasswordAndCvc(id: number,cvc: number, password: number) {
    const cardInfo: any = await existCardAndExpireDate(id);
    const cryptr = new Cryptr('myTotallySecretKey');
    const confirmCvc: number = Number(cryptr.decrypt(`${cardInfo.securityCode}`));
    const criptPassword: string = cryptr.encrypt(`${password}`);
    console.log(confirmCvc);
   
    if(cardInfo.password) { 
        throw { code: "Bad Request", message: "This card already have password registred, so you can't active it again"};
    } if(confirmCvc!==cvc) { 
        throw { code: "Unauthorized", message: "Wrong CVC"};
    } 

    await update(id,criptPassword);
}