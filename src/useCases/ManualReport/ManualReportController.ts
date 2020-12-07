import TelegramBot, {
  CallbackQuery,
  Message,
  User,
} from 'node-telegram-bot-api';
import formatToReal from '../../helpers/formatToReal';
import { ManualReportUseCase } from './ManualReportUseCase';

export class ManualReportController {
  constructor(
    private manualReportUseCase: ManualReportUseCase,
    private bot: TelegramBot
  ) {}

  handle(msg: Message) {
    const occurenceTypesButtons = this.getOccurrenceTypesButtons();

    this.bot.sendMessage(msg.chat.id, 'Qual foi a ocorrência? 👮🚔', {
      reply_markup: {
        inline_keyboard: occurenceTypesButtons,
      },
    });

    this.bot.off('callback_query', this.handleCallbackQuery);
    this.bot.on('callback_query', this.handleCallbackQuery);
  }

  getOccurrenceTypesButtons() {
    return [
      [{ text: 'Falou o nome', callback_data: `spokeName` }],
      [{ text: 'Enviou figurinha', callback_data: `sentSticker` }],
    ];
  }

  handleCallbackQuery = ({
    data: occurenceType,
    message,
    from,
  }: CallbackQuery) => {
    this.editButtonsMessage(message, from);

    this.bot.onReplyToMessage(message.chat.id, message.message_id, (reply) => {
      this.handleReply(reply, message, occurenceType);
    });
  };

  editButtonsMessage(message: Message, from: User) {
    this.bot.editMessageText(
      `👮 Boa @${from.username}!! 🚨 *Responde essa mensagem* 🚨 marcando o meliante `,
      {
        chat_id: message.chat.id,
        message_id: message.message_id,
        parse_mode: 'Markdown',
      }
    );
  }

  handleReply = async (reply: Message, message: Message, occurenceType: string) => {
    const words = reply.text.split(' ');

    const usernameWithAt = words.find((word) => word.startsWith('@'));

    const username = usernameWithAt.split('').slice(1).join('');

    if (username) {
      return this.taxAndSaveOccurence(username, message, reply, occurenceType);
    }

    this.sendNoMentionMessage(message);
  };

  async taxAndSaveOccurence(
    username: string,
    message: Message,
    reply: Message,
    occurenceType: string
  ) {
    const {
      alreadyRegistered,
      debtor,
      isNewDebtor,
    } = await this.manualReportUseCase.execute({
      username,
      occurenceType,
      message: message,
    });

    if (alreadyRegistered) {
      return this.bot.sendMessage(
        message.chat.id,
        '👮 Já contabilizei 🧮 essa, obrigado 🙏 agente da lei'
      );
    }

    const formattedOwedAmount = formatToReal(debtor.owed_amount);

    if (isNewDebtor) {
      return this.bot.sendMessage(
        message.chat.id,
        `👮 Obrigado @${reply.from.username}, agora @${debtor.username} está nos nossos 📒 registros e devendo ${formattedOwedAmount} 🤑🤑`
      );
    }

    return this.bot.sendMessage(
      message.chat.id,
      `👮 Obrigado @${reply.from.username}, agora @${debtor.username} tá devendo ${formattedOwedAmount} 🤑🤑`
    );
  }

  sendNoMentionMessage(message: Message) {
    this.bot.sendMessage(message.chat.id, 'Não entendi... 👮');
  }
}
