import { v4 as uuid } from 'uuid';
import knex from '../../database/connection';
import { Debtor } from "../../entities/Debtor";
import { IDebtorsRepository } from "../IDebtorsRepository";

export class SqlLiteDebtorsRepository implements IDebtorsRepository {
  async findByUsername(username: string): Promise<Debtor>{
    return await knex('debtors')
      .select('*')
      .where('username', username)
      .first();
  }

  async save(debtor: Debtor): Promise<void>{
    const id = uuid();

    await knex('debtors').insert({
      ...debtor,
    });
  }

  async getAll(): Promise<Debtor[]>{
    return await knex('debtors')
      .select('*');
  }

  async incrementOwedAmount(id: string, updatedOwedAmount: number): Promise<void>{
    await knex('debtors')
      .where('id', id)
      .update({
        owed_amount: updatedOwedAmount
      })
  }
}