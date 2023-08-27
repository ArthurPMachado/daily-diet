import { FastifyRequest, FastifyReply } from 'fastify'
import { randomUUID } from 'node:crypto'

export function verifyAndCreateSessionId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  let sessionId = request.cookies.sessionId

  if (!sessionId) {
    sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1 * 60 * 60 * 24 * 7, // 7 days
    })
  }
}
