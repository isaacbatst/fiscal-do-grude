import { Debtor } from "../entities/Debtor";
import { Fund } from "../entities/Fund";

export interface IDebtorsRepository {
  findByUsername(username: string): Promise<Debtor>;
  save(debtor: Debtor): Promise<void>;
  getAll(): Promise<Debtor[]>;
  incrementOwedAmount(debtor: Debtor, fund: Fund, owedAmount: number): Promise<void>;
}