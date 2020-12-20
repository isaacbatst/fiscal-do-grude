import { getRepository, Repository } from "typeorm";
import { Chat } from "../../entities/Chat";
import { IChatsRepository } from "../IChatsRepository";

export class TypeOrmChatsRepository implements IChatsRepository {
  private repository: Repository<Chat>;

  constructor(){
    this.repository = getRepository(Chat);
  }

  async findById(id: string): Promise<Chat>{
    return await this.repository.findOne(id);
  }

  async save(chat: Chat) {
    await this.repository.save(chat)
  }

  async getAll() {
    return await this.repository.find();
  }
}