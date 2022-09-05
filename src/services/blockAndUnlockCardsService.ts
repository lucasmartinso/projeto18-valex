import { findById } from "../repositories/cardRepository";

export async function block(id:number) {
    const cardInfo: any = await findById(id);
    console.log(cardInfo);

    if(!cardInfo.isBlocked) { 
        throw { code: "Bad Request", message: "This card is already blocked"};
    }
}