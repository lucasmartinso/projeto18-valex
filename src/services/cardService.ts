import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";
import { cardSchema } from "../schemas/cardSchema";

export async function validationCardSchema(schema: object) {
    const validation = cardSchema.validate(schema);

    if(validation.error) { 
        throw { code: "Unprocessable Entity", message: validation.error.details[0].message}
    }
} 

export async function existApiCompany(apiKey: any) { 
    const company: object = await findByApiKey(apiKey);

    if(!company) { 
        throw { code: "Not Found", message: "These Api Key don't makes reference to a company in the database"}
    }
} 

export async function exitEmployee(id: number) {
    const employee: object = await findById(id); 
    console.log(employee);

    if(!employee) { 
        throw { code: "Not Found", message: "These Api Key don't makes reference to a company in the database"}
    }
}