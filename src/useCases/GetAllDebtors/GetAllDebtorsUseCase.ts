import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";

export class GetAllDebtorsUseCase {
  constructor(
    private debtorsRepository: IDebtorsRepository
  ){}

  async execute(){
    const debtors = await this.debtorsRepository.getAll();

    return debtors;
  }
}