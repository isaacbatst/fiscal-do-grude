import bot from "../../telegram/bot";
import { SqlLiteFundsRepository } from "../../repositories/implementations/SqlLiteFundsRepository";
import { CreateFundUseCase } from "./CreateFundUseCase";
import { CreateFundController } from "./CreateFundController";
import { SqlLiteChatsRepository } from "../../repositories/implementations/SqlLiteChatsRepository";

const sqlLiteFundsRepository = new SqlLiteFundsRepository();
const sqlLiteChatsRepository = new SqlLiteChatsRepository();

const createFundUseCase = new CreateFundUseCase(sqlLiteFundsRepository, sqlLiteChatsRepository);
const createFundController = new CreateFundController(createFundUseCase, bot);

export default createFundController;