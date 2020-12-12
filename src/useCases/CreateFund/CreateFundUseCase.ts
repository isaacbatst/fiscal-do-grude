import { Fund } from "../../entities/Fund";
import { IFundsRepository } from "../../repositories/IFundsRepository";
import { ICreateFundRequestDTO } from "./CreateFundDTO";

export class CreateFundUseCase {
  constructor(
    private fundsRepository: IFundsRepository,
  ){}

  async execute(data: ICreateFundRequestDTO) {
    const fund = new Fund({
      ...data,
      total_owed: 0
    });

    await this.fundsRepository.save(fund);
  }
}