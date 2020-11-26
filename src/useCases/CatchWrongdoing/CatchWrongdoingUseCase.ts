import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";

export class CatchWrongdoingUseCase {
  constructor(
    private debtorsRepository: IDebtorsRepository
  ){}

  async execute(){
    console.log('vou contar pra mãe...')
  }
}