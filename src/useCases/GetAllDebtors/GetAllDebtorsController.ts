import TelegramBot, { Message } from 'node-telegram-bot-api';
import { GetAllDebtorsUseCase } from './GetAllDebtorsUseCase';
import formatToReal from '../../helpers/formatToReal';

export class GetAllDebtorsController {
  constructor(
    private getAllDebtorsUseCase: GetAllDebtorsUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    const debtors = await this.getAllDebtorsUseCase.execute();

    const sendingMessage = debtors.reduce((message: string, debtor) => {
      const formattedOwedAmount = formatToReal(debtor.owed_amount);

      return `${message}\n @${debtor.username}: ${formattedOwedAmount}`;
    }, '');

    this.bot.sendMessage(
      msg.chat.id,
      sendingMessage || 'Ainda não flagramos ninguém...'
    );
  }
}
