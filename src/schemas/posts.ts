import { IndexDescription } from "mongodb";
import { schema as paprschema, types } from "papr";

const name = 'posts';

const schema = paprschema({
  name: types.string({ required: true, maxLength: 100 }),
  content: types.string({ required: true, maxLength: 20 }),
}, {
  defaults: { }
});

const indexes: IndexDescription[] = [
  { key: { name: 1 }, unique: true },
]

export type PostModel = typeof schema[0];
export const posts = { name, schema, indexes };
