import bot from "../../telegram/bot";
import { SqlLiteFundsRepository } from "../../repositories/implementations/Knex/FundsRepository";
import { SqlLiteChatsRepository } from "../../repositories/implementations/Knex/ChatsRepository";
import { CreateFundUseCase } from "./CreateFundUseCase";
import { CreateFundController } from "./CreateFundController";

const sqlLiteFundsRepository = new SqlLiteFundsRepository();
const sqlLiteChatsRepository = new SqlLiteChatsRepository();

const createFundUseCase = new CreateFundUseCase(sqlLiteFundsRepository, sqlLiteChatsRepository);
const createFundController = new CreateFundController(createFundUseCase, bot);

export default createFundController;