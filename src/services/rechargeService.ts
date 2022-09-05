import { insert } from "../repositories/rechargeRepository";
import { rechargeSchema } from "../schemas/rechargeSchema";
import { existCardAndExpireDate } from "./activeCardService";
import { RechargeInsertData } from "../repositories/rechargeRepository"

export async function validationRechargeSchema(schema: object) {
    const validation = rechargeSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function verifyCardInfo(id: number) { 
    const cardInfo: any = await existCardAndExpireDate(id);
    
    if(!cardInfo.password) { 
        throw { code: "Bad Request", message: "This card aren't active"};
    } 
} 

export async function rechargeCard(id: number, amount: number) { 
    const rechargeData: RechargeInsertData = { cardId: id, amount }
    await insert(rechargeData);
}