import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('groups', table => {
    table.string('id').primary();
    table.string('id_fund').unsigned().notNullable();
    table.foreign('id_fund').references('funds.id');
    table.timestamps(false, true);
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('groups');
}

