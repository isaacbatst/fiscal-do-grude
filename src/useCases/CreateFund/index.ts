import bot from "../../telegram/bot";
import { CreateFundUseCase } from "./CreateFundUseCase";
import { CreateFundController } from "./CreateFundController";
import { TypeOrmFundsRepository } from "../../repositories/implementations/FundsRepository";
import { TypeOrmChatsRepository } from "../../repositories/implementations/ChatsRepository";

const fundsRepository = new TypeOrmFundsRepository();
const chatsRepository = new TypeOrmChatsRepository();

const createFundUseCase = new CreateFundUseCase(fundsRepository, chatsRepository);
const createFundController = new CreateFundController(createFundUseCase, bot);

export default createFundController;