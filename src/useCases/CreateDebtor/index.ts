import bot from "../../telegram/bot";
import { SqlLiteDebtorsRepository } from "../../repositories/implementations/Knex/DebtorsRepository";
import { CreateDebtorUseCase } from "./CreateDebtorUseCase";
import { CreateDebtorController } from "./CreateDebtorController";

const sqlLiteDebtorsRepository = new SqlLiteDebtorsRepository();

const createDebtorUseCase = new CreateDebtorUseCase(sqlLiteDebtorsRepository);
const createDebtorController = new CreateDebtorController(createDebtorUseCase, bot);

export default createDebtorController;