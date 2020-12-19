import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/Knex/DebtorsRepository";
import { SqlLiteOccurencesRepository } from "../../repositories/implementations/Knex/OccurencesRepository";
import { ManualReportController } from "./ManualReportController";
import { ManualReportUseCase } from "./ManualReportUseCase";

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();
const sqlLiteOccurencesRepository = new SqlLiteOccurencesRepository()

const manualReportUseCase = new ManualReportUseCase(sqlLiteDebtorsRepository, sqlLiteOccurencesRepository)
const manualReportController = new ManualReportController(manualReportUseCase, bot);

export default manualReportController;