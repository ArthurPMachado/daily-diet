/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { knex } from '@/database'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'
import { createMealSchema, editMealSchema } from '@/schema/create-meal-schema'
import { getMealSchema, getMealsSchema } from '@/schema/get-meal-schema'
import { IMeal } from '@/interface/IMeal'
import { findBestSequence } from '@/utils/findBestSequence'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/user/:user_id/metrics', async (request) => {
    const { user_id } = getMealsSchema.parse(request.params)

    const meals = await knex('meals').select().where({ user_id })

    const { mealsInDiet, mealsOutDiet, highestSequence } =
      findBestSequence(meals)

    let percentageOfMealsInDiet = 0

    if (mealsInDiet.length >= 1) {
      percentageOfMealsInDiet = (mealsInDiet.length / meals.length) * 100
    }

    const responseObject = {
      mealsInDiet: mealsInDiet.length,
      mealsOutDiet: mealsOutDiet.length,
      totalMeals: meals.length,
      percentageOfMealsInDiet: Number(percentageOfMealsInDiet.toFixed(2)),
      highestSequenceOfMealsInDiet: highestSequence.length,
    }

    return responseObject
  })

  app.get('/:id', async (request) => {
    const { id } = getMealSchema.parse(request.params)

    const meal = await knex('meals').select().where({ id })

    return { meal }
  })

  app.get('/user/:user_id', async (request) => {
    const { user_id } = getMealsSchema.parse(request.params)

    const meals = await knex('meals').select().where({ user_id })

    return { meals }
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

    await knex<IMeal>('meals').insert({
      id: randomUUID(),
      ...mealBody,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
