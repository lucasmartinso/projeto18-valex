import { connection } from "../databases/database";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );

  return result.rows[0];
} 

export async function cardsPerEmployeer(id: number) {
  const result = await connection.query(
    `SELECT json_build_object( 
      'cards', json_agg(json_build_object(
          'number', number, 
          'cardholderName', "cardholderName", 
          'expirationDate', "expirationDate", 
          'securityCode', "securityCode"
      )))
    FROM cards 
    WHERE "employeeId"=$1`,
    [id]
  );

  return result.rows.map(res => res.json_build_object)[0];
}
