import bot from "../../telegram/bot";
import { SqlLiteFundsRepository } from "../../repositories/implementations/SqlLiteFundsRepository";
import { CreateFundUseCase } from "./CreateFundUseCase";
import { CreateFundController } from "./CreateFundController";

const sqlLiteFundsRepository = new SqlLiteFundsRepository();

const createFundUseCase = new CreateFundUseCase(sqlLiteFundsRepository);
const createFundController = new CreateFundController(createFundUseCase, bot);

export default createFundController;