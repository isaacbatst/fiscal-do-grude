import { Debtor } from "../../entities/Debtor";
import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";
import { ICreateDebtorRequestDTO } from "./CreateDebtorDTO";

export class CreateDebtorUseCase {
  constructor(
    private debtorsRepository: IDebtorsRepository,
  ){}

  async execute(data: ICreateDebtorRequestDTO) {
    const debtorAlreadyExists = await this.debtorsRepository.findByUsername(data.username);

    if(debtorAlreadyExists){
      throw new Error('Já cadastrado :P')
    }

    const debtor = new Debtor(data);

    await this.debtorsRepository.save(debtor);
  }
}