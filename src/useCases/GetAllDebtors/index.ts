import bot from "../../telegram/bot";
import { GetAllDebtorsUseCase } from "./GetAllDebtorsUseCase";
import { GetAllDebtorsController } from "./GetAllDebtorsController";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/Knex/DebtorsRepository";

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const getAllDebtorsUseCase = new GetAllDebtorsUseCase(sqlLiteDebtorsRepository);
const getAllDebtorsController = new GetAllDebtorsController(getAllDebtorsUseCase, bot);

export default getAllDebtorsController;