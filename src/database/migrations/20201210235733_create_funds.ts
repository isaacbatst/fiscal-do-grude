import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('funds', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('token').notNullable();
    table.decimal('total_owed')
    table.timestamps(false, true);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('funds');
}

