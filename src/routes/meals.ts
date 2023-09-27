import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { knex } from '@/database'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'
import { createMealSchema, editMealSchema } from '@/schema/create-meal-schema'
import { getMealSchema } from '@/schema/get-meal-schema'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const mealBody = createMealSchema.parse(request.body)

    const sessionId = request.cookies.sessionId

    const user = await knex('users')
      .select()
      .where({
        id: mealBody.user_id,
      })
      .first()

    if (!user) {
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

  app.put('/:id', async (request, reply) => {
    const { id } = getMealSchema.parse(request.params)
    const editMealBody = editMealSchema.parse(request.body)

    const isRecordUpdated = await knex('meals')
      .where({ id })
      .update(editMealBody)

    if (isRecordUpdated) {
      reply.status(204).send()
    } else {
      reply.status(404).send({ message: 'Meal was not found' })
    }
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = getMealSchema.parse(request.params)

    const isRecordDeleted = await knex('meals').delete().where({ id })

    if (isRecordDeleted) {
      reply.status(204).send()
    } else {
      reply.status(404).send({ message: 'Meal was not found' })
    }
  })
}
