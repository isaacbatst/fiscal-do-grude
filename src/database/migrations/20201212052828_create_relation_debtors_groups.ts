import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('debtors_groups', table => {
    table.string('id_group').unsigned()
    table.foreign('id_group').references('group.id');
    table.string('id_debtor').unsigned()
    table.foreign('id_debtor').references('debtors.id');

    table.primary(['id_group', 'id_debtor'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('debtors_groups');
}

