// AUTO GENERATED — DO NOT EDIT
import { Model } from 'papr';
import { asCollection } from '@inaiat/fastify-papr';
import { posts } from '../schemas/posts.js';
import { users } from '../schemas/users.js';

declare module '@inaiat/fastify-papr' {
  interface FastifyPapr {
    posts: Model<typeof posts.schema[0], Partial<typeof posts.schema[1]>>;
    users: Model<typeof users.schema[0], Partial<typeof users.schema[1]>>;
  }
}

export const models = {
  posts: asCollection(posts.name, posts.schema, posts.indexes),
  users: asCollection(users.name, users.schema, users.indexes),
};
