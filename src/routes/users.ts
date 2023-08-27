import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { createUserBodySchema } from '@/schema/create-user-schema'
import { knex } from '@/database'
import { getUserSchema } from '@/schema/get-user-schema'

export async function usersRoutes(app: FastifyInstance) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.get('/', async (request, reply) => {
    const users = await knex('users').select()

    return { users }
  })

  app.get('/:id', async (request, reply) => {
    const { id } = getUserSchema.parse(request.params)

    const user = await knex('users').select().where('id', id).first()

    return { user }
  })

  app.post('/', async (request, reply) => {
    const { email, password } = createUserBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      email,
      password,
    })

    console.log(request.body)

    return reply.status(201).send()
  })
}
