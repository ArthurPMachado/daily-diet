import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { createUserBodySchema } from '@/schema/create-user-schema'
import { knex } from '@/database'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'

export async function usersRoutes(app: FastifyInstance) {
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
