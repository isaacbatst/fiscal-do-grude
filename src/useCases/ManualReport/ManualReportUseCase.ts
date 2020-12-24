import { Message, User } from 'node-telegram-bot-api';
import { Debtor } from '../../entities/Debtor';
import { Occurence } from '../../entities/Occurence';
import { IDebtorsRepository } from '../../repositories/IDebtorsRepository';
import { IChatsRepository } from '../../repositories/IChatsRepository';
import { IOccurencesRepository } from '../../repositories/IOccurencesRepository';
import { IManualReportDTO } from './ManualReportDTO';

export class ManualReportUseCaseResponse {
  constructor (props: ManualReportUseCaseResponse){
    Object.assign(this, props);
  }

  debtor?: Debtor;
  isNewDebtor?: Boolean;
  isUsernameInvalid?: Boolean;
  isChatInvalid?:Boolean;
  isAlreadyRegistered?: Boolean;
}
export class ManualReportUseCase {
  private taxes = {
    spokeName: 1,
    sentSticker: 0.25,
  };

  constructor(
    private debtorsRepository: IDebtorsRepository,
    private occurencesRepository: IOccurencesRepository,
    private chatsRepository: IChatsRepository
  ) {}

  async executeHandleManualReport({ chat: { id } }: Message) {
    const chat = await this.chatsRepository.findById(id.toString());

    if(!chat) {
      throw new ManualReportUseCaseResponse ({
         isChatInvalid: true
      })
    }

    if(chat.funds.length === 1) {
      return {
        fund: chat.funds[0]
      };
    }

    throw new ManualReportUseCaseResponse ({
      isChatInvalid: true
   })
  }

  async executeHandleReply({ occurenceType, message, reply }: IManualReportDTO): Promise<ManualReportUseCaseResponse> {
    try {
      const username = this.validateUsername(reply);

      this.validateOccurence(message);

      return await this.taxDebtor({ occurenceType, message, reply }, username);
    } catch (error) {
      return error
    }
  }

  private validateUsername(reply: Message) {
    const words = reply.text.split(' ');
    const usernameWithAt = words.find((word) => word.startsWith('@'));

    if(!usernameWithAt) {
      throw {
        isUsernameInvalid: false
      };
    }

    const username = usernameWithAt.split('').slice(1).join('');

    return username;
  }
  
  async validateOccurence(message: Message){
    const occurence = await this.occurencesRepository.findByMessageId(
      message.message_id
    );

    if (occurence) {
      throw new ManualReportUseCaseResponse({
        isAlreadyRegistered: true,
      });
    }
  }

  async validateChat({ chat: { id: chat_id } }: Message) {
    return await this.chatsRepository.findById(chat_id.toString());
  }

  async taxDebtor({ reply, occurenceType, message }: IManualReportDTO, username: string) {
    const debtor = await this.debtorsRepository.findByUsername(username);

    if (debtor) {
      await this.taxExistingDebtor(debtor, message, occurenceType);

      return {
        isAlreadyRegistered: false,
        debtor: debtor,
        isNewDebtor: false,
      };
    }

    return {
      isAlreadyRegistered: false,
      debtor: await this.taxAndCreateNewDebtor(username, message, occurenceType),
      isNewDebtor: true,
    };
  }

  async taxAndCreateNewDebtor(
    username: string,
    message: Message,
    occurenceType: string
  ) { 
    const owedAmount = this.taxes[occurenceType]

    const debtor = new Debtor({
      username,
      name: username,

    });

    await this.debtorsRepository.save(debtor);
    await this.saveOccurence(debtor.id, message.message_id);

    return debtor;
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
