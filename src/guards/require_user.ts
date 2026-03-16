import fp from "fastify-plugin";
import { ObjectId } from "mongodb";
import { UserModel } from "../schemas/users.js";

export default fp(async (fastify) => {
  fastify.decorateRequest('requireUser', async function () {
    const user = await this.server.papr.users.findById(new ObjectId('69a8a165eeedfd3392c0c209'))

    if (!user)
      throw new Error('Hello');

    return user;
  })
});

declare module 'fastify' {
  export interface FastifyRequest {
    requireUser(): Promise<UserModel>,
  }
}
