import Knex from 'knex';

declare module 'knex/types/tables' {
  interface Debtor {
    id: string,
    name: string,
    username: string,
    owed_amount: number,
    created_at: string,
    updated_at: string
  }

  interface Occurence {
    id: string,
    debtor_id: string,
    message_id: number,
    is_manual: boolean,
    created_at: string,
    updated_at: string
  }

  interface Fund {
    id: string,
    name: string,
    token: string,
    total_owed: number,
    created_at: string,
    updated_at: string
  }

  interface Tables {
    debtors: Knex.CompositeTableType<
      Debtor, 
      Omit<Debtor, "created_at" | "updated_at">,
      Partial<
        Omit<Debtor, "id" | "created_at" | "updated_at">
      >
    >,

    occurences: Knex.CompositeTableType<
      Occurence,
      Omit<Occurence, "created_at" | "updated_at">,
      Partial<
        Omit<Occurence, "id" | "created_at" | "updated_at">
      >
    >
  }
}