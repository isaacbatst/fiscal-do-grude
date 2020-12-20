import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Debtor } from "./Debtor";

export class Occurence {
  constructor(props: Omit<Occurence, 'id' | 'created_at' | 'updated_at' >, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Debtor)
  @JoinColumn({
    name: 'id_debtor'
  })
  debtor: Debtor;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 0
  })
  message_id: number;

  @Column()
  is_manual: boolean;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}