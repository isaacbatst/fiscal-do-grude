import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Debtor } from './Debtor';
import { Fund } from './Fund';

@Entity()
export class Chat {
  constructor(
    props: Pick<Chat, 'id' | 'funds'> & Partial<Omit<Chat, 'id' | 'funds'>>
  ) {
    Object.assign(this, props);
  }

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

