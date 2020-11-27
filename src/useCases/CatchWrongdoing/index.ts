import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/SqlLiteDebtorsRepository";
import { CatchWrongdoingUseCase } from "./CatchWrongdoingUseCase";
import { CatchWrongdoingController } from "./CatchWrongdoingController";


const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const catchWrongdoingUseCase = new CatchWrongdoingUseCase(sqlLiteDebtorsRepository);
const catchWrongdoingController = new CatchWrongdoingController(catchWrongdoingUseCase, bot);

export default catchWrongdoingController;