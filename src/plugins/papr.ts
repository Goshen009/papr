import fastifyPaprPlugin from '@inaiat/fastify-papr'
import { models } from '../types/papr.generated.js';
import { SchemaType, SchemaOptions } from "papr";
import { MongoClient } from 'mongodb';
import fp from 'fastify-plugin';

export type Brand<TSchema, K extends keyof TSchema> = TSchema[K] & { readonly __brand: K };

export type BrandSchema<
	TSchema extends [SchemaType<Record<string, unknown>, SchemaOptions<Record<string, unknown>>>, SchemaOptions<Record<string, unknown>>],
	TOverrides extends { [K in keyof TOverrides]: K extends keyof TSchema[0] ? Brand<TSchema[0], K> : never }
> = [
  Omit<TSchema[0], keyof TOverrides> & TOverrides,
  TSchema[1]
];

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
