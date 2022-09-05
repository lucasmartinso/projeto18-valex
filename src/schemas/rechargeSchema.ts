import joi from "joi"; 

export const rechargeSchema = joi.object({ 
    amount: joi.number().min(0.01).required()
}) 