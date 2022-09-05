import joi from "joi"; 

export const securityCardSchema = joi.object({ 
    cvc: joi.string().pattern(/^[0-9]{3}$/).required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
})