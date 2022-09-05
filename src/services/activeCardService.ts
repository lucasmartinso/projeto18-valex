import Cryptr from 'cryptr';
import { findById } from '../repositories/cardRepository';
import "dayjs/locale/pt-br.js";
import dayjs from "dayjs";
import { securityCardSchema } from "../schemas/activeCardSchema";

export async function validationSecuritySchema(schema: object) {
    const validation = securityCardSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function existCardAndExpireDate(id: number) { 
    const cardInfo: any = await findById(id);
    const cardDate: any = cardInfo.expirationDate;
    
    if(!cardInfo) { 
        throw { code: "Not Found", message: "These card id aren't registreted in database"}
    } 

    const nowBr = dayjs().locale("pt-br");
    const hoje: string = nowBr.format("MM/YY");

    if(Number(hoje.substring(3,5)) > Number(cardDate.substring(3,5)) || (Number(hoje.substring(3,5)) === Number(cardDate.substring(3,5)) && Number(hoje.substring(0,2)) > Number(cardDate.substring(0,2)))) { 
        throw { code: "Bad Request", message: "This card already have experited"};
    }

    return cardInfo;
}  

export async function verifyPasswordAndCvc(id: number,cvc: number, password: number) {
    const cardInfo: any = await existCardAndExpireDate(id);
   
    if(cardInfo.password) { 
        throw { code: "Bad Request", message: "This card already have password registred, so you can't active it again"};
    }
}