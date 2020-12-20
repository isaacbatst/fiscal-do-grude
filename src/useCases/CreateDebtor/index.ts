import bot from "../../telegram/bot";
import { CreateDebtorUseCase } from "./CreateDebtorUseCase";
import { CreateDebtorController } from "./CreateDebtorController";
import { TypeOrmDebtorsRepository } from "../../repositories/implementations/DebtorsRepository";

const debtorsRepository = new TypeOrmDebtorsRepository();

const createDebtorUseCase = new CreateDebtorUseCase(debtorsRepository);
const createDebtorController = new CreateDebtorController(createDebtorUseCase, bot);

export default createDebtorController;