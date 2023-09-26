import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { knex } from '@/database'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'
import { createMealSchema } from '@/schema/create-meal-schema'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const mealBody = createMealSchema.parse(request.body)

    const sessionId = request.cookies.sessionId

    const user = await knex('users').select().where({
      id: mealBody.user_id,
    })

    if (user.length < 1) {
      reply.status(400)
      throw new Error('User does not exists for the meal to be associated')
    }

    verifyAndCreateSessionId(sessionId, reply)

    await knex('meals').insert({
      id: randomUUID(),
      ...mealBody,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
