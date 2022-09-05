import joi from "joi"; 

export const cardSchema = joi.object({ 
    employeeId: joi.number().required(),
    type: joi.string().valid("groceries","restaurant","transport","education","health").required()
}) 

export const securityCardSchema = joi.object({ 
    cvc: joi.string().pattern(/^[0-9]{3}$/).required(),
    password: joi.string().pattern(/^[0-9]{4}$/).required()
}) 

export const passwordSchema = joi.object({ 
    password: joi.string().pattern(/^[0-9]{4}$/).required()
}) 

export const passwordsSchema = joi.object({ 
    passwordGroceries: joi.string().pattern(/^[0-9]{4}$/), 
    passwordRestaurant: joi.string().pattern(/^[0-9]{4}$/), 
    passwordTransport: joi.string().pattern(/^[0-9]{4}$/),  
    passwordEducation: joi.string().pattern(/^[0-9]{4}$/), 
    passwordHealth: joi.string().pattern(/^[0-9]{4}$/)
})