import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/SqlLiteDebtorsRepository";
import { ManualReportController } from "./ManualReportController";
import { ManualReportUseCase } from "./ManualReportUseCase";
import { SqlLiteOccurencesRepository } from "../../repositories/implementations/SqlLiteOccurencesRepository";

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();
const sqlLiteOccurencesRepository = new SqlLiteOccurencesRepository()

const manualReportUseCase = new ManualReportUseCase(sqlLiteDebtorsRepository, sqlLiteOccurencesRepository)
const manualReportController = new ManualReportController(manualReportUseCase, bot);

export default manualReportController;