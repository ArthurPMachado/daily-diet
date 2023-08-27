import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { createUserBodySchema } from '@/schema/create-user-schema'
import { knex } from '@/database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const { email, password } = createUserBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1 * 60 * 60 * 24 * 7, // 7 days
      })

      await knex('users').insert({
        id: randomUUID(),
        email,
        password,
      })

      return reply.status(201).send()
    }
  })
}
