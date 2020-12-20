import { getRepository, Repository } from 'typeorm';
import { Fund } from '../../entities/Fund';
import { IFundsRepository } from '../IFundsRepository';

export class TypeOrmFundsRepository implements IFundsRepository {
  private repository: Repository<Fund>;
  
  constructor(){
    this.repository = getRepository(Fund);
  }

  async findByToken(token: string) {
    return await this.repository.findOne({
      token
    })
  }

  async getAll() {
    return await this.repository.find();
  }

  async save(fund: Fund) {
    await this.repository.save(fund);
  }


  async incrementTotalOwed(id: string, totalOwed: number) {
    await this.repository.save({
      id,
      total_owed: totalOwed
    })
  }
}
