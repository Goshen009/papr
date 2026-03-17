import fastifyPaprPlugin from '@inaiat/fastify-papr'
import { models } from '../types/papr.generated.js';
import { MongoClient } from 'mongodb';
import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
  const client = await MongoClient.connect(fastify.config.db_uri);

  await fastify.register(fastifyPaprPlugin, {
    db: client.db(fastify.config.db_name),
    models
  });

  fastify.addHook('onClose', async () => await client.close());
}, {
  name: 'papr',
  dependencies: ['env']
})
