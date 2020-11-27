import TelegramBot, { Message } from 'node-telegram-bot-api';
import { CatchWrongdoingUseCase } from './CatchWrongdoingUseCase';
import formatToReal from '../../helpers/formatToReal';

export class CatchWrongdoingController {
  constructor(
    private catchWrongdoingUseCase: CatchWrongdoingUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    try {
      const { debtor, isNewDebtor } = await this.catchWrongdoingUseCase.execute(msg.from);

      const formattedOwedAmount = formatToReal(debtor.owedAmount);

      if(isNewDebtor){
        return this.bot.sendMessage(msg.chat.id, `@${debtor.username} entrou para a brincadeira! Tá devendo ${formattedOwedAmount} bb 🤑🤑`);
      }

      return this.bot.sendMessage(msg.chat.id, `Boa, @${debtor.username}! tá humilde, ein? Agora tá devendo ${formattedOwedAmount} pro rolé 😅💸`)
    } catch (err) {
      this.bot.sendMessage(msg.chat.id, err.message )
      this.bot.sendMessage(msg.chat.id, 'CC: @isaacbatst')
    }
  }
}
