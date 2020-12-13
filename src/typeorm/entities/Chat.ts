import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Debtor } from './Debtor';
import { Fund } from './Fund';

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Fund, fund => fund.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  funds: Fund[]

  @ManyToMany(() => Debtor, debtor => debtor.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

