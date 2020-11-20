import TelegramBot from 'node-telegram-bot-api';
import sentSticker from './commands/sentSticker';

const database = '../data.json';
const TOKEN = `1313305857:AAHxdy8m4DNl7UlJgonqmEz0Lfbn1ZNj1SY`

const bot = new TelegramBot(TOKEN, { polling: true })


sentSticker(bot, database);

bot.onText(/\/falou_nome/, msg => {
  console.log(msg)
  bot.sendMessage(msg.chat.id, 'shhhhh');
})

bot.on("text", msg => {
  console.log(msg)
})