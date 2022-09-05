import Cryptr from 'cryptr';
import { cardsPerEmployeer } from '../repositories/employeeRepository';
import { findByCardId } from '../repositories/paymentRepository';
import { findByCardIdRe } from '../repositories/rechargeRepository';
import { passwordSchema, passwordsSchema } from "../schemas/cardSchema";
import { existCardAndExpireDate } from "./activeCardService";

export async function validationPasswordSchema(schema: object) {
    const validation = passwordSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
}  

export async function validationPasswordsSchema(schema: object) {
    const validation = passwordsSchema.validate(schema);

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

export async function balanceTransactionRecharges(id: number) { 
    const transactions: object[] | any = await findByCardId(id);
    const recharges: object[] | any = await findByCardIdRe(id);
    let outgoing = 0;
    let over = 0;
    
    for(let i=0; i<transactions.length; i++) { 
        outgoing+= transactions[i].amount;
    } 
    for(let i=0; i<recharges.length; i++) { 
        over+= recharges[i].amount;
    }
   
    const balance = { 
        balance: over - outgoing, 
        transactions, 
        recharges
    }

    return balance;
}

