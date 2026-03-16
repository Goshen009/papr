import { IndexDescription } from "mongodb";
import { schema as paprschema, types } from "papr";

const RoleArray = ['user', 'admin'] as const;

const name = 'users';

const schema = paprschema({
  name: types.string({ required: true, maxLength: 100 }),
  phone: types.string({ required: true, maxLength: 20 }),
  role: types.enum(RoleArray, { required: true }),
  age: types.oneOf([types.null(), types.number()], { required: true })
}, {
  defaults: {
    role: 'user' as Role
  }
});

const indexes: IndexDescription[] = [
  { key: { name: 1 }, unique: true },
  { key: { phone: 1}, unique: true},
]

export type Role = typeof RoleArray[number];

export type UserModel = typeof schema[0];
export const users = { name, schema, indexes };