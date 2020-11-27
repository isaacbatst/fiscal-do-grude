import TelegramBot, { Message } from 'node-telegram-bot-api';
import { SpeakingAboutUseCase } from './SpeakingAboutUseCase';
import formatToReal from '../../helpers/formatToReal';

export class SpeakingAboutController {
  constructor(
    private speakingAboutUseCase: SpeakingAboutUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    try {
      const { debtor, isNewDebtor } = await this.speakingAboutUseCase.execute(msg.from);

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
