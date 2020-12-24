import bot from "../../telegram/bot";
import { GetAllDebtorsUseCase } from "./GetAllDebtorsUseCase";
import { GetAllDebtorsController } from "./GetAllDebtorsController";
import { TypeOrmDebtorsRepository } from "../../repositories/implementations/DebtorsRepository";

const typeOrmDebtorsRepository = new TypeOrmDebtorsRepository();

const getAllDebtorsUseCase = new GetAllDebtorsUseCase(typeOrmDebtorsRepository);
const getAllDebtorsController = new GetAllDebtorsController(getAllDebtorsUseCase, bot);

export default getAllDebtorsController;