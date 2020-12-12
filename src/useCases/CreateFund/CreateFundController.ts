import TelegramBot, { Message } from "node-telegram-bot-api";
import { CreateFundUseCase } from "./CreateFundUseCase";

export class CreateFundController {
  constructor(
    private createFundUseCase: CreateFundUseCase,
    private bot: TelegramBot,
  ){}
  
  async handle(msg: Message) {
    const sentMessage = await this.bot.sendMessage(msg.chat.id, 'Responda essa mensagem com o nome da vaquinha :p')
    
    this.bot.onReplyToMessage(sentMessage.chat.id, sentMessage.message_id, message => {
      // this.handleReply(message)
      console.log(sentMessage.chat)
    })
  }

  async handleReply(message: Message) {
    try {
      await this.createFundUseCase.execute({
        name: message.text,
        chat_id: message.chat.id.toString()
      })

      this.bot.sendMessage(message.chat.id, 'Registrado, bbs ;*');
    } catch (err) {
      await this.bot.sendMessage(message.chat.id, err.message )
      await this.bot.sendMessage(message.chat.id, 'cc: @isaacbatst')
    }
  }
}