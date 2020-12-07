import { Occurence } from "../entities/Occurence";

export interface IOccurencesRepository {
  findByMessageId(messageId: number): Promise<Occurence>;
  save(occurence: Occurence): Promise<void>;
  getAll(): Promise<Occurence[]>;
}