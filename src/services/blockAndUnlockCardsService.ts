import { findById, updateIsBloqued } from "../repositories/cardRepository";

export async function block(id:number) {
    const cardInfo: any = await findById(id);

    if(cardInfo.isBlocked) { 
        throw { code: "Bad Request", message: "This card is already blocked"};
    }

    await updateIsBloqued(id,true);
}

export async function unlock(id:number) {
    const cardInfo: any = await findById(id);

    if(!cardInfo.isBlocked) { 
        throw { code: "Bad Request", message: "This card is already unlocked"};
    } 

    await updateIsBloqued(id,false);
}