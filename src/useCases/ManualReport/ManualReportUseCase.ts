import { Message, User } from 'node-telegram-bot-api';
import { Debtor } from '../../entities/Debtor';
import { Occurence } from '../../entities/Occurence';
import { IDebtorsRepository } from '../../repositories/IDebtorsRepository';
import { IOccurencesRepository } from '../../repositories/IOccurencesRepository';
import { IManualReportDTO } from './ManualReportDTO';

export class ManualReportUseCase {
  private taxes = {
    spokeName: 1,
    sentSticker: 0.25,
  };

  constructor(
    private debtorsRepository: IDebtorsRepository,
    private occurencesRepository: IOccurencesRepository
  ) {}

  async execute({ username, occurenceType, message }: IManualReportDTO) {
    const occurence = await this.occurencesRepository.findByMessageId(
      message.message_id
    );

    if (occurence) {
      return {
        alreadyRegistered: true,
        debtor: null,
        isNewDebtor: null,
      };
    }

    return await this.taxDebtor({ username, occurenceType, message });
  }

  async taxDebtor({ username, occurenceType, message }: IManualReportDTO) {
    const debtor = await this.debtorsRepository.findByUsername(username);

    if (debtor) {
      await this.taxExistingDebtor(debtor, message, occurenceType);

      return {
        alreadyRegistered: false,
        debtor: debtor,
        isNewDebtor: false,
      };
    }

    return {
      alreadyRegistered: false,
      debtor: await this.taxAndCreateNewDebtor(username, message, occurenceType),
      isNewDebtor: true,
    };
  }

  async taxAndCreateNewDebtor(
    username: string,
    message: Message,
    occurenceType: string
  ) {
    const debtor = new Debtor({
      username,
      name: username,
      owed_amount: this.taxes[occurenceType],
    });

    await this.debtorsRepository.save(debtor);

    await this.saveOccurence(debtor.id, message.message_id);

    return debtor
  }

  async taxExistingDebtor(
    debtor: Debtor,
    message: Message,
    occurenceType: string
  ) {
    debtor.owed_amount = debtor.owed_amount + this.taxes[occurenceType];

    await this.debtorsRepository.incrementOwedAmount(
      debtor.id,
      debtor.owed_amount
    );

    await this.saveOccurence(debtor.id, message.message_id);
  }

  async saveOccurence(debtor_id: string, message_id: number) {
    const occurence = new Occurence({
      debtor_id,
      message_id,
      is_manual: true,
    });

    await this.occurencesRepository.save(occurence);
  }
}
