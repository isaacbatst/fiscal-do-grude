import TelegramBot, { Message } from "node-telegram-bot-api";
import { GetAllDebtorsUseCase } from "./GetAllDebtorsUseCase";

export class GetAllDebtorsController {
  constructor(
    private getAllDebtorsUseCase: GetAllDebtorsUseCase,
    private bot: TelegramBot
  ){}

  async handle(msg: Message){
    const debtors = await this.getAllDebtorsUseCase.execute();

    const sendingMessage = debtors.reduce((message: string, debtor) => {
      return `${message}\n ${debtor.name}: ${debtor.owedAmount}`;
    }, '');

    this.bot.sendMessage(msg.chat.id, sendingMessage);
  }
}