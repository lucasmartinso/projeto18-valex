import joi from "joi"; 

export const securityCardSchema = joi.object({ 
    cvc: joi.string().length(3).required(),
    password: joi.string().length(4).required()
})