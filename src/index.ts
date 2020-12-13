import bot from './telegram/bot';

import 'reflect-metadata';

import createDebtorController from './useCases/CreateDebtor';
import createFundController from './useCases/CreateFund';
import getAllDebtorsController from './useCases/GetAllDebtors';
import manualIncrementController from './useCases/ManualReport';
import speakingAboutController from './useCases/SpeakingAbout';
import { createConnection } from 'typeorm';

bot.onText(/\/vale_introsa/, msg => createDebtorController.handle(msg));
bot.onText(/\/listar_devedores/, msg => getAllDebtorsController.handle(msg))
bot.onText(/vitor|victor/i, msg => speakingAboutController.handle(msg));
bot.onText(/\/delatar_coleguinha/, msg => manualIncrementController.handle(msg));
bot.onText(/\/iniciar_vaquinha/, msg => createFundController.handle(msg));

bot.on("polling_error", (msg) => console.log(msg));

createConnection()
  .catch(error => console.log(error));