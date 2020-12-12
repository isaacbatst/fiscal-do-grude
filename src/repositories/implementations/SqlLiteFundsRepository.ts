import { v4 as uuid } from 'uuid';
import knex from '../../database/connection';
import { Fund } from '../../entities/Fund';
import { IFundsRepository } from "../IFundsRepository";

export class SqlLiteFundsRepository implements IFundsRepository {
  async findByToken(token: string): Promise<Fund>{
    return await knex('fund')
      .select('*')
      .where('token', token)
      .first();
  }

  async save(occurence: Fund): Promise<void> {
    const id = uuid();

    await knex("funds").insert({
      id,
      ...occurence
    })
  }

  async getAll(): Promise<Fund[]> {
    return await knex
      .select("*")
      .from("funds")
  }
}