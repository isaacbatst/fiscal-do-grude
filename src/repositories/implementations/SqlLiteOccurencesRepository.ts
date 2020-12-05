import { v4 as uuid } from 'uuid';
import knex from '../../database/connection';
import { Ocurrence } from 'knex/types/tables';
import { Occurence } from '../../entities/Occurence';
import { IOccurencesRepository } from "../IOccurencesRepository";

export class SqlLiteOccurencesRepository implements IOccurencesRepository {
  async findByMessageId(messageId: string): Promise<Occurence> {
    return await knex
      .select("*")
      .from("occurences")
      .where("message_id", messageId)
      .first();
  }

  async save(occurence: Ocurrence) {
    const id = uuid();

    await knex("occurences").insert({
      id,
      ...occurence
    })
  }

  async getAll() {
    return await knex
      .select("*")
      .from("occurences")
  }
}