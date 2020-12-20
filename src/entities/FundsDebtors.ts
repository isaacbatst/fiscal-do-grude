import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Debtor } from './Debtor';
import { Fund } from './Fund';

@Entity('funds_debtors')
export class FundsDebtors {
  @Column('decimal')
  owed_amount: number

  @ManyToOne(() => Fund, fund => fund.fundsDebtors, {
    primary: true
  })
  @JoinColumn({
    name: 'id_fund'
  })
  fund: Fund

  @ManyToOne(() => Debtor, debtor => debtor.fundsDebtors, {
    primary: true
  })
  @JoinColumn({
    name: 'id_debtor'
  })
  debtor: Debtor

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
