import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { z } from "zod/v4";

const schema = z.object({
  name: z.string(),
  phone: z.string(),
});

async function handler(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { name, phone } = request.body;

  const user = await this.papr.users.insertOne({
    name, phone, age: 50,
  });

  const p = await this.papr.posts.insertOne({
     name: 'hi',
     content: 'hello',
     meta: {
        type: 'user',
        username: '',
     },
  });

  const t = await this.papr.posts.findById('');
  if (t) {
   if (t.meta.type === 'user')
      console.log(t.meta.username);
   else
      console.log(t.meta.some_other_thing);
  }

  return reply.code(200).send({ _id: user._id });
}

const options = {
  schema: { body: schema }
};
export const register = { options, handler };
