import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Chat } from './Chat';
import { Fund } from './Fund';
import { FundsDebtors } from './FundsDebtors';
import { v4 as uuid } from 'uuid';

@Entity()
export class Debtor {
  constructor(
    props: Pick<Debtor, 'name' | 'username'> & Partial<Debtor>
  ) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = uuid();
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

