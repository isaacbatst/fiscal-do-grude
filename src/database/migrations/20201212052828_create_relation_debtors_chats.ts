import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('debtors_chats', table => {
    table.string('id_chat').unsigned()
    table.foreign('id_chat').references('chat.id');
    table.string('id_debtor').unsigned()
    table.foreign('id_debtor').references('debtors.id');

    table.primary(['id_chat', 'id_debtor'])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('debtors_chats');
}

