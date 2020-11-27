import bot from './telegram/bot';

import createDebtorController from './useCases/CreateDebtor';
import getAllDebtorsController from './useCases/GetAllDebtors';
import speakingAboutController from './useCases/SpeakingAbout';

bot.onText(/\/entrar/, msg => createDebtorController.handle(msg));
bot.onText(/\/listar_devedores/, msg => getAllDebtorsController.handle(msg))
bot.onText(/vitor|victor/i, msg => speakingAboutController.handle(msg));

