import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Chat } from './Chat';
import { Debtor } from './Debtor';
import { FundsDebtors } from './FundsDebtors';

@Entity()
export class Fund {
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

  @ManyToMany(() => Chat, chat => chat.id)
  @JoinTable({
    name: 'funds_chats',
    joinColumn: {
      name: 'id_fund',
    },
    inverseJoinColumn: {
      name: 'id_chat',
    }
  })
  chats: Chat[]

  @ManyToMany(() => Debtor, debtor => debtor.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'funds_debtors',
    joinColumn: {
      name: 'id_fund',
    },
    inverseJoinColumn: {
      name: 'id_debtor'
    }
  })
  debtors: Debtor[]

  @OneToMany(() => FundsDebtors, fundsDebtors => fundsDebtors.fund)
  fundsDebtors: FundsDebtors[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

