// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      email: string
      password: string
      created_at: string
      session_id: string
    }
    meals: {
      id: string
      user_id: string
      name: string
      description?: string
      meal_date: string
      meal_time: string
      is_in_diet: boolean
      created_at: string
    }
  }
}
