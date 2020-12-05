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

  interface Ocurrence {
    id: string,
    debtor_id: string,
    message_id: string,
    is_manual: boolean,
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
      Ocurrence,
      Omit<Ocurrence, "created_at" | "updated_at">,
      Partial<
        Omit<Ocurrence, "id" | "created_at" | "updated_at">
      >
    >
  }
}