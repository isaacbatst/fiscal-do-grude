import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('occurences', table => {
    table.string('id').primary();
    table.string('debtor_id').unsigned().notNullable();
    table.foreign('debtor_id').references('debtors.id');
    table.integer('message_id').notNullable();
    table.boolean('is_manual').notNullable();
    table.timestamps(false, true);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('occurences');
}

