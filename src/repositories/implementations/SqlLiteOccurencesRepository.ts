import { v4 as uuid } from 'uuid';
import knex from '../../database/connection';
import { Occurence } from '../../entities/Occurence';
import { IOccurencesRepository } from "../IOccurencesRepository";

export class SqlLiteOccurencesRepository implements IOccurencesRepository {
  async findByMessageId(messageId: number): Promise<Occurence> {
    return await knex
      .first("*")
      .from("occurences")
      .where("message_id", messageId)
  }

  async save(occurence: Occurence): Promise<void> {
    const id = uuid();

    await knex("occurences").insert({
      id,
      ...occurence
    })
  }

  async getAll(): Promise<Occurence[]> {
    return await knex
      .select("*")
      .from("occurences")
  }
}