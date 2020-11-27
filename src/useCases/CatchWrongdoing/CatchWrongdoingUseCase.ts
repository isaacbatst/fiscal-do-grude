import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";
import { User } from "node-telegram-bot-api";
import { Debtor } from "../../entities/Debtor";

export class CatchWrongdoingUseCase {
  private speakingAboutTax = 1;

  constructor(
    private debtorsRepository: IDebtorsRepository
  ){}

  async execute({ username, first_name }: User){
    const foundDebtor = await this.debtorsRepository.findByUsername(username);

    if(foundDebtor) {
      return this.incrementOwedAmount(foundDebtor)
    }

    const debtor = new Debtor({
      username,
      name: first_name,
      owedAmount: this.speakingAboutTax
    })
    
    await this.debtorsRepository.save(debtor);

    return {
      debtor,
      isNewDebtor: true,
    }
  }

  async incrementOwedAmount(debtor: Debtor) {
    debtor.owedAmount = debtor.owedAmount + this.speakingAboutTax;

    await this.debtorsRepository.incrementOwedAmount(debtor.id, debtor.owedAmount);
    
    return {
      debtor,
      isNewDebtor: false
    }
  }
}