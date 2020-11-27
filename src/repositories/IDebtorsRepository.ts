import { Debtor } from "../entities/Debtor";

export interface IDebtorsRepository {
  findByUsername(username: string): Promise<Debtor>;
  save(debtor: Debtor): Promise<void>;
  getAll(): Promise<Debtor[]>;
  incrementOwedAmount(id: string, updatedOwedAmount: number): Promise<void>;
}