import { IDebtorsRepository } from '../../repositories/IDebtorsRepository';

export class ManualReportUseCase {
  constructor(private debtorsRepository: IDebtorsRepository) {}

  async execute(username: string, occurence: string) {
    console.log(username, occurence)
  }
}
