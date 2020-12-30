import { Connection, getRepository, Repository } from 'typeorm';
import { Debtor } from '../../entities/Debtor';
import { Fund } from '../../entities/Fund';
import { FundsDebtors } from '../../entities/FundsDebtors';
import { IDebtorsRepository } from '../IDebtorsRepository';

export class TypeOrmDebtorsRepository implements IDebtorsRepository {
  private repository: Repository<Debtor>;
  private fundsDebtorsRepository: Repository<FundsDebtors>;

  async findByUsername(username: string) {
    return await this.repository.findOne({
      username,
    });
  }

  async getAll() {
    return await this.repository.find();
  }

  async save(Debtor: Debtor) {
    await this.repository.save(Debtor);
  }

  async incrementOwedAmount(debtor: Debtor, fund: Fund, owedAmount: number) {
    await this.fundsDebtorsRepository.save({
      debtor,
      fund,
      owed_amount: owedAmount,
    });
  }
}
