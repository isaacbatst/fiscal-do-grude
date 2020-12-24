import { createConnection } from "typeorm";
import { Chat } from "../../entities/Chat";
import { Fund } from "../../entities/Fund";
import { IChatsRepository } from "../../repositories/IChatsRepository";
import { IFundsRepository } from "../../repositories/IFundsRepository";
import { ICreateFundRequestDTO } from "./CreateFundDTO";

export class CreateFundUseCase {
  constructor(
    private fundsRepository: IFundsRepository,
    private chatsRepository: IChatsRepository
  ){}

  async execute(data: ICreateFundRequestDTO) {
    const connection = await createConnection();

    if(this.chatsRepository.findById(data.chat_id)){
      throw new Error('A gente já tem um cadastro aqui...')
    }

    const fund = new Fund({
      ...data,
      chats: [],
      total_owed: 0
    });

    await this.fundsRepository.save(fund);
    
    const chat = new Chat({
      id: data.chat_id,
      funds: [fund],
    })

    await this.chatsRepository.save(chat);
  }
}