import { IndexDescription } from "mongodb";
import { schema as paprschema, types } from "papr";

const name = 'posts';

const schema = paprschema({
  name: types.string({ required: true, maxLength: 100 }),
  content: types.string({ required: true, maxLength: 20 }),
  meta: types.oneOf([
     types.object({
        type: types.constant('user' as const, { required: true }),
        username: types.string({ required: true }),
     }, { required: true}),

     types.object({
        type: types.constant('other_thing' as const, { required: true }),
        some_other_thing: types.string({ required: true })
     }, { required: true })
  ], { required: true }),
}, {
  defaults: { }
});

const indexes: IndexDescription[] = [
  { key: { name: 1 }, unique: true },
]

export type PostModel = typeof schema[0];
export const posts = { name, schema, indexes };
