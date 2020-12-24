import { Connection, getRepository, Repository } from 'typeorm';
import { Occurence } from '../../entities/Occurence';
import { IOccurencesRepository } from '../IOccurencesRepository';

export class TypeOrmOccurencesRepository implements IOccurencesRepository {
  private repository: Repository<Occurence>;
  async findByMessageId(message_id: number) {
    return await this.repository.findOne({
      message_id
    })
  }

  async getAll() {
    return await this.repository.find();
  }

  async save(Occurence: Occurence) {
    await this.repository.save(Occurence);
  }
}
