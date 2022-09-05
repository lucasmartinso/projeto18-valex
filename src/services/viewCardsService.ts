import Cryptr from 'cryptr';
import { cardsPerEmployeer } from '../repositories/employeeRepository';
import { passwordSchema } from "../schemas/cardSchema";
import { existCardAndExpireDate } from "./activeCardService";

export async function validationPasswordSchema(schema: object) {
    const validation = passwordSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function verifyActiveAndPassword(id: number, password: number) { 
    const cardInfo: any = await existCardAndExpireDate(id);
    
    if(!cardInfo.password) { 
        throw { code: "Bad Request", message: "This card aren't active"};
    } 
    
    const cryptr = new Cryptr('myTotallySecretKey');
    const confirmPassword: number | undefined = Number(cryptr.decrypt(`${cardInfo.password}`));

    if(confirmPassword!==password) { 
        throw { code: "Unauthorized", message: "Wrong password"};
    } 

    const viewCardInfo: any = await cardsPerEmployeer(cardInfo.employeeId);
    for(let i: number =0 ; i<viewCardInfo.cards.length; i++) { 
        viewCardInfo.cards[i].securityCode = cryptr.decrypt(`${viewCardInfo.cards[i].securityCode}`);
        const number = viewCardInfo.cards[i].number;
        viewCardInfo.cards[i].number = `${number.substring(0,4)} ${number.substring(4,8)} ${number.substring(8,12)} ${number.substring(12,16)}`

    }
    return viewCardInfo;
} 

