import bot from './telegram/bot';

import createDebtorController from './useCases/CreateDebtor';
import getAllDebtorsController from './useCases/GetAllDebtors';
import catchWrongdoingController from './useCases/CatchWrongdoing';

bot.onText(/\/entrar/, msg => createDebtorController.handle(msg));
bot.onText(/\/listar_devedores/, msg => getAllDebtorsController.handle(msg))
bot.onText(/vitor|victor/i, msg => catchWrongdoingController.handle(msg));

