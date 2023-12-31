import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('users.id').index()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.text('meal_date').notNullable()
    table.text('meal_time').notNullable()
    table.boolean('is_in_diet').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('meals', (table) => {
    table.dropForeign('user_id')
  })

  await knex.schema.dropTable('meals')
}
