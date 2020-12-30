import { Message } from 'node-telegram-bot-api';
import { Debtor } from '../../entities/Debtor';
import { Occurence } from '../../entities/Occurence';
import { IDebtorsRepository } from '../../repositories/IDebtorsRepository';
import { IChatsRepository } from '../../repositories/IChatsRepository';
import { IOccurencesRepository } from '../../repositories/IOccurencesRepository';
import { IManualReportDTO } from './ManualReportDTO';
import { Fund } from '../../entities/Fund';
import { Chat } from '../../entities/Chat';
import { FundsDebtors } from '../../entities/FundsDebtors';

export class ManualReportUseCaseResponse {
  constructor(props: ManualReportUseCaseResponse) {
    Object.assign(this, props);
  }

  debtor?: Debtor;
  isNewDebtor?: Boolean;
  isUsernameInvalid?: Boolean;
  isChatInvalid?: Boolean;
  isOldOccurence?: Boolean;
}

export class ManualReportUseCase {
  private taxes = {
    spokeName: 1,
    sentSticker: 0.25,
  };

  private fund: Fund;
  private chat: Chat;

  constructor(
    private debtorsRepository: IDebtorsRepository,
    private occurencesRepository: IOccurencesRepository,
    private chatsRepository: IChatsRepository
  ) {}

  async executeHandleManualReport({ chat: { id } }: Message) {
    const chat = await this.chatsRepository.findById(id.toString());

    if (!chat) {
      throw new ManualReportUseCaseResponse({
        isChatInvalid: true,
      });
    }

    if (chat.funds.length > 0) {
      this.fund = chat.funds[0];
      this.chat = chat;

      return {
        fund: chat.funds[0],
      };
    }

    throw new ManualReportUseCaseResponse({
      isChatInvalid: true,
    });
  }

  async executeHandleReply({
    occurenceType,
    message,
    reply,
  }: IManualReportDTO): Promise<ManualReportUseCaseResponse> {
    try {
      const username = this.findUsername(reply);

      this.validateOccurence(message);

      return await this.taxDebtor({ occurenceType, message, reply }, username);
    } catch (error) {
      return error;
    }
  }

  private findUsername(reply: Message) {
    const words = reply.text.split(' ');
    const usernameWithAt = words.find((word) => word.startsWith('@'));

    if (!usernameWithAt) {
      throw {
        isUsernameInvalid: false,
      };
    }

    const username = usernameWithAt.split('').slice(1).join('');

    return username;
  }

  async validateOccurence(message: Message) {
    const occurence = await this.occurencesRepository.findByMessageId(
      message.message_id
    );

    if (occurence) {
      throw new ManualReportUseCaseResponse({
        isOldOccurence: true,
      });
    }
  }

  async validateChat({ chat: { id: chat_id } }: Message) {
    return await this.chatsRepository.findById(chat_id.toString());
  }

  async taxDebtor(
    { occurenceType, message }: IManualReportDTO,
    username: string
  ) {
    const debtor = await this.debtorsRepository.findByUsername(username);

    if (debtor) {
      await this.taxExistingDebtor(debtor, message, occurenceType);

      return {
        isOldOccurence: false,
        debtor: debtor,
        isNewDebtor: false,
      };
    }

    return {
      isOldOccurence: false,
      debtor: await this.taxAndCreateNewDebtor(
        username,
        message,
        occurenceType
      ),
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
      chats: [this.chat],
      funds: [this.fund],
    });

    const owedAmount = this.taxes[occurenceType];

    await this.debtorsRepository.save(debtor);
    await this.debtorsRepository.incrementOwedAmount(debtor, this.fund, owedAmount)
    await this.saveOccurence(debtor, message.message_id);

    return debtor;
  }

  async taxExistingDebtor(
    debtor: Debtor,
    message: Message,
    occurenceType: string
  ) {
    const { owed_amount: oldOwedAmount } = debtor.fundsDebtors.find(fundDebtor => fundDebtor.fund.id === this.fund.id)

    const owedAmount = oldOwedAmount + this.taxes[occurenceType]

    await this.debtorsRepository.incrementOwedAmount(
      debtor,
      this.fund,
      owedAmount
    );

    await this.saveOccurence(debtor, message.message_id);
  }

  async saveOccurence(debtor: Debtor, message_id: number) {
    const occurence = new Occurence({
      debtor,
      message_id,
      is_manual: true,
    });

    await this.occurencesRepository.save(occurence);
  }
}
