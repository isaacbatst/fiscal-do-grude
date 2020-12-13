import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Chat } from './Chat';
import { Fund } from './Fund';
import { FundsDebtors } from './FundsDebtors';

@Entity()
export class Debtor {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  username: string;

  @ManyToMany(() => Fund, fund => fund.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  funds: Fund[]

  @OneToMany(() => FundsDebtors, fundsDebtors => fundsDebtors.debtor)
  fundsDebtors: FundsDebtors[]

  @ManyToMany(() => Chat, chat => chat.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'debtors_chats',
    joinColumn: {
      name: 'debtor_id'
    },
    inverseJoinColumn: {
      name: 'chat_id'
    }
  })
  chats: Chat[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

