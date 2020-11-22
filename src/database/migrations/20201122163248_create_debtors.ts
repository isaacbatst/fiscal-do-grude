import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('debtors', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('username').notNullable().unique();
    table.string('owedAmount').notNullable();
    table.timestamps(false, true);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('debtors');
}

