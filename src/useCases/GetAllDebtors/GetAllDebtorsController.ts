import TelegramBot, { Message } from 'node-telegram-bot-api';
import { GetAllDebtorsUseCase } from './GetAllDebtorsUseCase';

export class GetAllDebtorsController {
  constructor(
    private getAllDebtorsUseCase: GetAllDebtorsUseCase,
    private bot: TelegramBot
  ) {}

  async handle(msg: Message) {
    const debtors = await this.getAllDebtorsUseCase.execute();

    const sendingMessage = debtors.reduce((message: string, debtor) => {
      const formatedOwedAmount = debtor.owedAmount.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL',
      });

      return `${message}\n @${debtor.username}: ${formatedOwedAmount}`;
    }, '');

    this.bot.sendMessage(
      msg.chat.id,
      sendingMessage || 'Ainda não flagramos ninguém...'
    );
  }
}
