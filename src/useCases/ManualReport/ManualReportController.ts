import TelegramBot, {
  CallbackQuery,
  Message,
  User,
} from 'node-telegram-bot-api';
import { Debtor } from '../../entities/Debtor';
import { Fund } from '../../entities/Fund';
import formatToReal from '../../helpers/formatToReal';
import {
  ManualReportUseCase,
  ManualReportUseCaseResponse,
} from './ManualReportUseCase';

export class ManualReportController {
  constructor(
    private manualReportUseCase: ManualReportUseCase,
    private bot: TelegramBot
  ) {}

  async handle(message: Message) {
    try {
      await this.manualReportUseCase.executeHandleManualReport(message);

      const occurenceTypesButtons = [
        [{ text: 'Falou o nome', callback_data: `spokeName` }],
        [{ text: 'Enviou figurinha', callback_data: `sentSticker` }],
      ];

      this.bot.sendMessage(message.chat.id, 'Qual foi a ocorrência? 👮🚔', {
        reply_markup: {
          inline_keyboard: occurenceTypesButtons,
        },
      });

      this.bot.off('callback_query', this.handleCallbackQuery);
      this.bot.on('callback_query', this.handleCallbackQuery);
    } catch (error) {
      this.handleError(error, message);
    }
  }

  private handleCallbackQuery = ({
    data: occurenceType,
    message,
    from,
  }: CallbackQuery) => {
    this.editButtonsMessage(message, from);

    this.bot.onReplyToMessage(message.chat.id, message.message_id, (reply) => {
      this.handleReply(reply, message, occurenceType);
    });
  };

  private editButtonsMessage(message: Message, from: User) {
    this.bot.editMessageText(
      `👮 Boa ${this.getUser(
        from
      )}!! 🚨 *Responde essa mensagem* 🚨 marcando o meliante `,
      {
        chat_id: message.chat.id,
        message_id: message.message_id,
        parse_mode: 'Markdown',
      }
    );
  }

  private getUser(user: User) {
    return user.username ? `@${user.username}` : user.first_name;
  }

  private handleReply = async (
    reply: Message,
    message: Message,
    occurenceType: string
  ) => {
    try {
      const response = await this.manualReportUseCase.executeHandleReply({
        occurenceType,
        message,
        reply,
      });

      return this.sendSuccessMessage(reply, response);
    } catch (error) {
      if (error instanceof ManualReportUseCaseResponse) {
        this.handleError(error, message);
      }
    }
  };

  private handleError(error: ManualReportUseCaseResponse, message: Message) {
    if (error instanceof ManualReportUseCaseResponse) {
      return this.handleManualReportError(error, message)
    }

    console.log(error);
  }

  private handleManualReportError(error: ManualReportUseCaseResponse, message: Message) {
    if (error.isUsernameInvalid) {
      this.sendNoMentionMessage(message);
    }

    if (error.isOldOccurence) {
      return this.bot.sendMessage(
        message.chat.id,
        '👮 Já contabilizei 🧮 essa, obrigado 🙏 agente da lei'
      );
    }
  }

  private async sendSuccessMessage(
    reply: Message,
    { isNewDebtor, debtor }: ManualReportUseCaseResponse
  ) {
    const formattedOwedAmount = formatToReal(
      debtor.fundsDebtors[0].owed_amount
    );

    if (isNewDebtor) {
      return this.sendNewDebtorMessage(reply, debtor, formattedOwedAmount);
    }

    this.sendOldDebtorMessage(reply, debtor, formattedOwedAmount);
  }

  private sendNewDebtorMessage(
    reply: Message,
    debtor: Debtor,
    formattedOwedAmount: string
  ) {
    this.bot.sendMessage(
      reply.chat.id,
      `👮 Obrigado, ${this.getUser(reply.from)}, agora @${
        debtor.username
      } está nos nossos 📒 registros e devendo ${formattedOwedAmount} 🤑🤑`
    );
  }

  private sendNoMentionMessage(message: Message) {
    this.bot.sendMessage(message.chat.id, 'Não entendi... 👮');
  }

  private sendOldDebtorMessage(
    reply: Message,
    debtor: Debtor,
    formattedOwedAmount: string
  ) {
    return this.bot.sendMessage(
      reply.chat.id,
      `👮 Obrigado, ${this.getUser(reply.from)}, agora @${
        debtor.username
      } tá devendo ${formattedOwedAmount} 🤑🤑`
    );
  }
}
