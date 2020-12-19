import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Chat } from './Chat';
import { Debtor } from './Debtor';
import { FundsDebtors } from './FundsDebtors';
import { v4 as uuid } from 'uuid';

@Entity()
export class Fund {
  constructor(
    props: Pick<Fund, 'chats' | 'name'> & Partial<Omit<Fund, 'chats' | 'name'>>
  ) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = uuid();
    }

    if (!this.token) {
      this.token = uuid();
    }

    if(!this.total_owed){
      this.total_owed = 0;
    }
  }

  @PrimaryColumn()
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  token: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2
  })
  total_owed: number

  @ManyToMany(() => Chat, (chat) => chat.id)
  @JoinTable({
    name: 'funds_chats',
    joinColumn: {
      name: 'id_fund',
    },
    inverseJoinColumn: {
      name: 'id_chat',
    },
  })
  chats: Chat[];

  @ManyToMany(() => Debtor, (debtor) => debtor.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'funds_debtors',
    joinColumn: {
      name: 'id_fund',
    },
    inverseJoinColumn: {
      name: 'id_debtor',
    },
  })
  debtors: Debtor[];

  @OneToMany(() => FundsDebtors, (fundsDebtors) => fundsDebtors.fund)
  fundsDebtors: FundsDebtors[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
