import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { ManualReportUseCase } from './ManualReportUseCase';

export class ManualReportController {
  constructor(
    private manualReportUseCase: ManualReportUseCase,
    private bot: TelegramBot
  ) {}

  handle(msg: Message) {
    console.log(msg.text);

    const buttons = [
      [{ text: 'Falou o nome', callback_data: `spokeName` }],
      [{ text: 'Enviou figurinha', callback_data: `sentSticker` }],
    ];

    this.bot.sendMessage(msg.chat.id, 'Qual foi a ocorrência? 👮🚔', {
      reply_markup: {
        inline_keyboard: buttons,
      },
    });

    this.bot.once('callback_query', this.handleCallbackQuery);
  }

  handleCallbackQuery = ({ data: occurence, message, from }: CallbackQuery) => {
    this.bot.editMessageText(
      `👮 Boa @${from.username}!! 🚨 *Responde essa mensagem* 🚨 marcando o meliante `,
      {
        chat_id: message.chat.id,
        message_id: message.message_id,
        parse_mode: 'Markdown',
      }
    );

    this.bot.onReplyToMessage(message.chat.id, message.message_id, (reply) => {
      this.handleReplyCallbackMessage(reply, occurence);
    });
  };

  handleReplyCallbackMessage = (reply: Message, ocurrence: string) => {
    const words = reply.text.split(' ');

    const mention = words.find((word) => word.startsWith('@'));

    if (mention) {
      this.manualReportUseCase.execute(mention, ocurrence);
    }
  };
}
