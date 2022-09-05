import Cryptr from 'cryptr';
import { findById } from '../repositories/businessRepository';
import { findByCardId, insert } from '../repositories/paymentRepository';
import { allMoneyPerCard } from '../repositories/rechargeRepository';
import { shoppingSchema } from '../schemas/shoppingSchema';
import { verifyCardInfo } from "./rechargeService";
import type { PaymentInsertData } from "../repositories/paymentRepository"

export async function validationShoppingSchema(schema: object) {
    const validation = shoppingSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function verifyCardAbbleToShopp(cardId: number, password: number, placeId: number) {
    const cardInfo = await verifyCardInfo(cardId);
    console.log(cardInfo);

    if(cardInfo.isBlocked) { 
        throw { code: "Bad Request", message: "This card is blocked"};
    } 

    const cryptr = new Cryptr('myTotallySecretKey');
    const confirmPassword: number | undefined = Number(cryptr.decrypt(`${cardInfo.password}`));
    const existPlace: any = await findById(placeId);

    if(confirmPassword!==password) { 
        throw { code: "Unauthorized", message: "Wrong password"};
    } else if(!existPlace) { 
        throw { code: "Not Found", message: "This place isn't registred in the database"};
    } else if(cardInfo.type!==existPlace.type) { 
        throw { code: "Bad Request", message: "This card is not allowed to shopping in this place, because the card type is not the same of the place"};
    }
}

export async function verifyEnoughMoney(cardId: number, amount: number, placeId: number) { 
    const cardTotalMoney: any = await allMoneyPerCard(cardId);
    const outgoing: any = await findByCardId(cardId);
    let outgoingValue= 0;
    
    if(outgoing.length>0) { 
        for(let i=0; i<outgoing.length; i++) { 
            outgoingValue+= outgoing[i].amount;
        }
    }

    const balance = cardTotalMoney.balance - outgoingValue;

    if(!cardTotalMoney || balance<amount) { 
        throw { code: "Bad Request", message: "You can't finish your shop, because the card's balance is lower than the purchase"};
    } 

    const paymentData: PaymentInsertData = { 
        cardId, 
        businessId: placeId,
        amount
    }
    await insert(paymentData);
}