import { IDebtorsRepository } from "../../repositories/IDebtorsRepository";
import { User } from "node-telegram-bot-api";
import { Debtor } from "../../entities/Debtor";

export class SpeakingAboutUseCase {
  private speakingAboutTax = 1;

  constructor(
    private debtorsRepository: IDebtorsRepository
  ){}

  async execute(user: User){
    const debtor = await this.debtorsRepository.findByUsername(user.username);

    if(debtor) {
      return this.taxExistingDebtor(debtor);
    }

    return this.taxAndCreateNewDebtor(user)
  }

  async taxAndCreateNewDebtor({ username, first_name }: User) {
    const debtor = new Debtor({
      username,
      name: first_name,
      owed_amount: this.speakingAboutTax
    })
    
    await this.debtorsRepository.save(debtor);

    return {
      debtor,
      isNewDebtor: true,
    }
  }

  async taxExistingDebtor(debtor: Debtor) {
    debtor.owed_amount = debtor.owed_amount + this.speakingAboutTax;

    await this.debtorsRepository.incrementOwedAmount(debtor.id, debtor.owed_amount);
    
    return {
      debtor,
      isNewDebtor: false
    }
  }
}