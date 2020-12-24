import { Connection, getRepository, Repository } from 'typeorm';
import { Debtor } from '../../entities/Debtor';
import { IDebtorsRepository } from '../IDebtorsRepository';

export class TypeOrmDebtorsRepository implements IDebtorsRepository {
  private repository: Repository<Debtor>;

  async findByUsername(username: string) {
    return await this.repository.findOne({
      username
    })
  }

  async getAll() {
    return await this.repository.find();
  }

  async save(Debtor: Debtor) {
    await this.repository.save(Debtor);
  }

  async incrementOwedAmount(id: string, owedAmount: number) {
    await this.repository.save({
      id,
      owed_amount: owedAmount
    })
  }
}
