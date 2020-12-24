import { TypeOrmDebtorsRepository } from "../../repositories/implementations/DebtorsRepository";
import { TypeOrmChatsRepository } from "../../repositories/implementations/ChatsRepository";
import { TypeOrmOccurencesRepository } from "../../repositories/implementations/OccurencesRepository";
import bot from "../../telegram/bot";
import { ManualReportController } from "./ManualReportController";
import { ManualReportUseCase } from "./ManualReportUseCase";

const debtorsRepository = new TypeOrmDebtorsRepository();
const occurencesRepository = new TypeOrmOccurencesRepository();
const chatsRepository = new TypeOrmChatsRepository()

const manualReportUseCase = new ManualReportUseCase(debtorsRepository, occurencesRepository, chatsRepository)
const manualReportController = new ManualReportController(manualReportUseCase, bot);

export default manualReportController;