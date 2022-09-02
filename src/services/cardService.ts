import { cardSchema } from "../schemas/cardSchema";

export async function createCardService(schema: object) {
    const validation = cardSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
}