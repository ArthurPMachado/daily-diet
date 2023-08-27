import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { createUserBodySchema } from '@/schema/create-user-schema'
import { knex } from '@/database'
import { getUserSchema } from '@/schema/get-user-schema'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const sessionId = request.cookies.sessionId

    verifyAndCreateSessionId(sessionId, reply)

    const users = await knex('users').select().where('session_id', sessionId)

    return { users }
  })

  app.get('/:id', async (request, reply) => {
    const { id } = getUserSchema.parse(request.params)

    const sessionId = request.cookies.sessionId

    verifyAndCreateSessionId(sessionId, reply)

    const user = await knex('users')
      .select()
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    return { user }
  })

  app.post('/', async (request, reply) => {
    const { email, password } = createUserBodySchema.parse(request.body)

    const sessionId = request.cookies.sessionId

    verifyAndCreateSessionId(sessionId, reply)

    await knex('users').insert({
      id: randomUUID(),
      email,
      password,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
