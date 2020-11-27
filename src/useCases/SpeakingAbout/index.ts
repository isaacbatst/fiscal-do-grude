import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/SqlLiteDebtorsRepository";
import { SpeakingAboutUseCase } from "./SpeakingAboutUseCase";
import { SpeakingAboutController } from "./SpeakingAboutController";


const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const speakingAboutUseCase = new SpeakingAboutUseCase(sqlLiteDebtorsRepository);
const speakingAboutController = new SpeakingAboutController(speakingAboutUseCase, bot);

export default speakingAboutController;