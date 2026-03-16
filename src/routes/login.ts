import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

async function handler(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = await request.requireUser();

  return reply.code(200).send(user)
}

export const login = { handler };
