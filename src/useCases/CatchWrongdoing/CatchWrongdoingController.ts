import TelegramBot, { Message } from 'node-telegram-bot-api';
import { CatchWrongdoingUseCase } from './CatchWrongdoingUseCase';

export class CatchWrongdoingController {
  constructor(
    private catchWrongdoingUseCase: CatchWrongdoingUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    try {
      this.catchWrongdoingUseCase.execute(msg.from);

      this.bot.sendMessage(msg.chat.id, 'Vou contar pra mãe...');
    } catch (err) {
      this.bot.sendMessage(msg.chat.id, err.message )
      this.bot.sendMessage(msg.chat.id, 'CC: @isaacbatst')
    }
  }
}
