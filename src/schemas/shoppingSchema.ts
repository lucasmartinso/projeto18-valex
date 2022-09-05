import joi from "joi"; 

export const shoppingSchema = joi.object({ 
    cardId: joi.number().required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required(), 
    amount: joi.number().min(0.01).required()
}) 