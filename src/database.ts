import { knex as setupKnex, Knex } from 'knex'
import { configuration } from './env'

export const databaseConfig: Knex.Config = {
  client: configuration.DATABASE_CLIENT,
  connection:
    configuration.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: configuration.DATABASE_URL,
        }
      : configuration.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(databaseConfig)
