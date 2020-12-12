import { Chat } from "../entities/Chat";

export interface IChatsRepository {
  findById(id: string): Promise<Chat>;
  save(chat: Chat): Promise<void>;
  getAll(): Promise<Chat[]>;
}