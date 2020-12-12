import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('funds_debtors', table => {
    table.string('id_fund').unsigned()
    table.foreign('id_fund').references('funds.id');
    table.string('id_debtor').unsigned()
    table.foreign('id_debtor').references('debtors.id');
    table.decimal('owed_amount').notNullable();

    table.primary(['id_fund', 'id_debtor'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('funds_debtors');
}

