import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/SqlLiteDebtorsRepository";
import { ManualReportController } from "./ManualReportController";
import { ManualReportUseCase } from "./ManualReportUseCase";

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const manualReportUseCase = new ManualReportUseCase(sqlLiteDebtorsRepository)
const manualReportController = new ManualReportController(manualReportUseCase, bot);

export default manualReportController;