import knex from '../../../database/connection';
import { Chat } from "../../../entities/Chat";
import { IChatsRepository } from "../../IChatsRepository";

export class SqlLiteChatsRepository implements IChatsRepository {
  async findById(id: string): Promise<Chat>{
    return await knex('chats')
      .first('*')
      .where('id', id)
  }

  async save(chat: Chat): Promise<void>{
    await knex('chats').insert({
      ...chat,
    });
  }

  async getAll(): Promise<Chat[]>{
    return await knex('chats')
      .select('*');
  }
}