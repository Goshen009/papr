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
  { key: { name: 1 } },
]

type Branded<TSchema, K extends keyof TSchema> = TSchema[K] & { readonly __brand: K };
type BrandSchema<TSchema, TOverrides> = [
  Omit<TSchema, keyof TOverrides> & TOverrides,
  typeof schema[1]
];

export type Content = Branded<typeof schema[0], 'content'>;
type BrandedPostSchema = BrandSchema<typeof schema[0], {
  content: Content,
  ade: ''
}>;

function myschema<
  TProperties extends Record<string, unknown>,
  TOptions extends SchemaOptions<TProperties>,
  TOverrides extends { [K in keyof TProperties]?: TProperties[K] & { readonly __brand: K & string } }
> (
  properties: TProperties,
  options?: TOptions,
  overrides?: TOverrides
) {
  const schema = paprschema<TProperties, TOptions>(properties, options);
  return schema as unknown as [
  	Omit<TProperties, keyof TOverrides> & TOverrides,
   TOptions
  ];
}

const xschema = myschema({
  content: ''
}, {
	defaults: { }
}, {
	content: '' as Content
})


function funcD<
	T extends Record<string, unknown>,
	K extends { [P in keyof T]: unknown }
>(
  obj: T,
  keys: Record<keyof T, unknown>
) {}

const obj = {
	name: 'Goshen',
	age: 9
};

type typeofobj = typeof obj;

funcD<typeofobj>(
  { name: '', age: 19 },
  { name: 'asdfa', age: 20, asd: '' }
);



export type PostModel = BrandedPostSchema[0];
export const posts = {
  name,
  schema: schema as unknown as BrandedPostSchema,
  indexes
};


// export type Content = string & { readonly __brand: 'Content' };


const variable = 'Shallom';
type BrandedVariable = typeof variable & { readonly __brand: 'variable' };


const testschema = paprschema({
  name: types.string({ required: true })
});

// type a = testschema[0].name;

type BrandedTestSchema = Omit<typeof testschema[0], 'name'>;

// type testType = typeof testschema[0];


export declare function schemaq<TProperties extends Record<string, unknown>, TOptions extends SchemaOptions<TProperties>>(properties: TProperties, options?: TOptions): [SchemaType<TProperties, TOptions>, TOptions];
export type DefaultsOption<TProperties> = Partial<TProperties> | (() => Partial<TProperties>) | (() => Promise<Partial<TProperties>>);
export interface SchemaOptions<TProperties> {
    defaults?: DefaultsOption<TProperties>;
    // timestamps?: SchemaTimestampOptions;
    // validationAction?: VALIDATION_ACTIONS;
    // validationLevel?: VALIDATION_LEVEL;
}
// export type SchemaType<TProperties extends Record<string, unknown>, TOptions extends SchemaOptions<unknown>> = TOptions extends TimestampsOptions ? ObjectType<TimestampSchema<TOptions['timestamps']> & WithId<TProperties>> : ObjectType<WithId<TProperties>>;




type Brand<T, K extends string> = T & { readonly __brand: K };

type BrandedPartial<T> = {
  [K in keyof T]?: Brand<T[K], K & string>;
};

function brand<T, K extends string>(value: T, _key: K): Brand<T, K> {
  return value as Brand<T, K>;
}

interface Test {
  funny: string
}

function func<TProp> (t: TProp, options: Partial<TProp>) {

}

func<Test>({ funny: '' }, { funny: 'content' });
