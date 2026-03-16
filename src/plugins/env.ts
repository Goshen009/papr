import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { Static, Type } from "@sinclair/typebox"

export default fp(async (fastify, opts) => {
  await fastify.register(fastifyEnv, { 
    schema: Schema,
  });
}, { name: "env" });

declare module "fastify" {
  export interface FastifyInstance {
    config: Config;
  }
}

export const Schema = Type.Object({
  db_uri: Type.String(),
  db_name: Type.String()
});

export type Config = Static<typeof Schema>;
