import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";
import { User } from "node-telegram-bot-api";
import { Debtor } from "../../entities/Debtor";

export class SpeakingAboutUseCase {
  private speakingAboutTax = 1;

  constructor(
    private debtorsRepository: IDebtorsRepository
  ){}

  async execute(user: User){
    const foundDebtor = await this.debtorsRepository.findByUsername(user.username);

    if(foundDebtor) {
      return this.taxExistingDebtor(foundDebtor)
    }

    return this.taxAndCreateNewDebtor(user)
  }

  async taxAndCreateNewDebtor({ username, first_name }: User) {
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

  async taxExistingDebtor(debtor: Debtor) {
    debtor.owedAmount = debtor.owedAmount + this.speakingAboutTax;

    await this.debtorsRepository.incrementOwedAmount(debtor.id, debtor.owedAmount);
    
    return {
      debtor,
      isNewDebtor: false
    }
  }
}