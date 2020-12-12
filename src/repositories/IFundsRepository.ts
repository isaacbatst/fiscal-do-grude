import { Fund } from "../entities/Fund";

export interface IFundsRepository {
  findByToken(token: string): Promise<Fund>;
  save(fund: Fund): Promise<void>;
  getAll(): Promise<Fund[]>;
  incrementTotalOwed(id: string, updatedOwedAmount: number): Promise<void>;
}