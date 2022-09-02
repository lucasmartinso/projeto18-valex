import joi from "joi"; 

export const cardSchema = joi.object({ 
    type: joi.string().valid("groceries","restaurants","transport","education","health").required()
})