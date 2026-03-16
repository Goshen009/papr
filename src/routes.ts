import { FastifyPluginAsync } from 'fastify'
import { register } from './routes/register.js';
import { login } from './routes/login.js';

const routes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  });

  fastify.post("/register", register.options, register.handler)

  fastify.get("/login", login.handler);
}

export default routes
