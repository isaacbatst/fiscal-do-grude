import bot from './telegram/bot';

import createDebtorController from './useCases/CreateDebtor';
import getAllDebtorsController from './useCases/GetAllDebtors';
import manualIncrementController from './useCases/ManualReport';
import speakingAboutController from './useCases/SpeakingAbout';

bot.onText(/\/vale_introsa/, msg => createDebtorController.handle(msg));
bot.onText(/\/listar_devedores/, msg => getAllDebtorsController.handle(msg))
bot.onText(/vitor|victor/i, msg => speakingAboutController.handle(msg));
bot.onText(/\/delatar_coleguinha/, msg => manualIncrementController.handle(msg));
bot.onText(/\/iniciar_vaquinha/, msg => bot.sendMessage(msg.chat.id, 'Crio já...'));


bot.on("polling_error", (msg) => console.log(msg));
