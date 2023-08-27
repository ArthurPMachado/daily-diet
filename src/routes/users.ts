import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { createUserBodySchema } from '@/schema/create-user-schema'
import { knex } from '@/database'
import { getUserSchema } from '@/schema/get-user-schema'
import { verifyAndCreateSessionId } from '@/utils/verifyAndCreateSessionId'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    verifyAndCreateSessionId(request, reply)

    const users = await knex('users').select()

    return { users }
  })

  app.get('/:id', async (request, reply) => {
    const { id } = getUserSchema.parse(request.params)

    verifyAndCreateSessionId(request, reply)

    const user = await knex('users').select().where('id', id).first()

    return { user }
  })

  app.post('/', async (request, reply) => {
    const { email, password } = createUserBodySchema.parse(request.body)

    verifyAndCreateSessionId(request, reply)

    await knex('users').insert({
      id: randomUUID(),
      email,
      password,
    })

    console.log(request.body)

    return reply.status(201).send()
  })
}
