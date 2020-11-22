import Knex from 'knex';

declare module 'knex/types/tables' {
  interface Debtor {
    id: string,
    name: string,
    username: string,
    owedAmount: string,
    created_at: string,
    updated_at: string
  }

  interface Tables {
    debtors: Debtor,
    debtors_composite: Knex.CompositeTableType<
      Debtor, 
      Omit<Debtor, "created_at" | "updated_at">,
      Partial<Omit<Debtor, "id">>
    >
  }
}