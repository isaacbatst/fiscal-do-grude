import { Ocurrence } from "knex/types/tables";
import { Occurence } from "../entities/Occurence";

export interface IOccurencesRepository {
  findByMessageId(messageId: string): Promise<Ocurrence>;
  save(occurence: Occurence): Promise<void>;
  getAll(): Promise<Occurence[]>;
}