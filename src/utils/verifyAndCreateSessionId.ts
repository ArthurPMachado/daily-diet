import { FastifyReply } from 'fastify'
import { randomUUID } from 'node:crypto'

export function verifyAndCreateSessionId(
  sessionId: string | undefined,
  reply: FastifyReply,
) {
  if (!sessionId) {
    sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1 * 60 * 60 * 24 * 7, // 7 days
    })
  }
}
