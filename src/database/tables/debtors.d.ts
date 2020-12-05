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
    debtors: Debtor,
    debtors_composite: Knex.CompositeTableType<
      Debtor, 
      Omit<Debtor, "created_at" | "updated_at">,
      Partial<
        Omit<Debtor, "id" | "created_at" | "updated_at">
      >
    >,

    occurences: Ocurrence,
    occurence_composite: Knex.CompositeTableType<
      Ocurrence,
      Omit<Ocurrence, "created_at" | "updated_at">,
      Partial<
        Omit<Ocurrence, "id" | "created_at" | "updated_at">
      >
    >
  }
}