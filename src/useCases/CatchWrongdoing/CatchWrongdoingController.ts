import TelegramBot, { Message } from 'node-telegram-bot-api';
import { CatchWrongdoingUseCase } from './CatchWrongdoingUseCase';

export class CatchWrongdoingController {
  constructor(
    private catchWrongdoingUseCase: CatchWrongdoingUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    this.catchWrongdoingUseCase.execute();

    this.bot.sendMessage(msg.chat.id, 'Vou contar pra mãe...');
  }
}
