import TelegramBot, { Message } from "node-telegram-bot-api";
import { CreateDebtorUseCase } from "./CreateDebtorUseCase";

export class CreateDebtorController {
  constructor(
    private createDebtorUseCase: CreateDebtorUseCase,
    private bot: TelegramBot,
  ){}
  
  async handle(msg: Message) {
    const { from: { first_name: name, username } } = msg;

    try {
      await this.createDebtorUseCase.execute({
        name,
        username,
        owedAmount: 0
      })

      this.bot.sendMessage(msg.chat.id, 'Registrado, bbs ;*');
    } catch (err) {
      this.bot.sendMessage(msg.chat.id, err.message )
      this.bot.sendMessage(msg.chat.id, 'CC: @isaacbatst')
    }
  }
}