import TelegramBot from 'node-telegram-bot-api';
import { SqlLiteDebtorsRepository } from './repositories/implementations/SqlLiteDebtorsRepository';

import { CreateDebtorController } from './useCases/CreateDebtor/CreateDebtorController';
import { CreateDebtorUseCase } from './useCases/CreateDebtor/CreateDebtorUseCase';
import { GetAllDebtorsUseCase } from './useCases/GetAllDebtors/GetAllDebtorsUseCase';
import { GetAllDebtorsController } from './useCases/GetAllDebtors/GetAllDebtorsController';

const TOKEN = `1313305857:AAHxdy8m4DNl7UlJgonqmEz0Lfbn1ZNj1SY`;
const bot = new TelegramBot(TOKEN, { polling: true });

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const createDebtorUseCase = new CreateDebtorUseCase(sqlLiteDebtorsRepository);
const createDebtorController = new CreateDebtorController(createDebtorUseCase, bot);
bot.onText(/\/entrar/, msg => createDebtorController.handle(msg));

const getAllDebtorsUseCase = new GetAllDebtorsUseCase(sqlLiteDebtorsRepository);
const getAllDebtorsController = new GetAllDebtorsController(getAllDebtorsUseCase, bot);
bot.onText(/\/listar_devedores/, msg => getAllDebtorsController.handle(msg))

bot.onText(/vitor|victor/i, (msg) => {
  bot.sendMessage(msg.chat.id, 'shhhhh');
});

