import { FastifyRequest, FastifyReply } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionsId = request.cookies.sessionId

  if (!sessionsId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
