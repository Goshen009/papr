import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemas_dir = join(__dirname, '../src/schemas');
const output_file = join(__dirname, '../src/types/papr.generated.ts');

const generate = async () => {
  const files = await readdir(schemas_dir);

  const schema_files = files.filter(f => f.endsWith('.ts') && f !== 'index.ts');
  // → ['users.ts', 'posts.ts']

  const names = schema_files.map(f => f.replace(".ts", ""));
  // → ['users', 'posts']

  const imports = names.map(name =>
     `import { ${name} } from '../schemas/${name}.js';`
  ).join('\n');

  const models = names.map(name =>
    `    ${name}: Model<typeof ${name}.schema[0], Partial<typeof ${name}.schema[1]>>;`
  ).join('\n');

  const registrations = names.map(name =>
     `  ${name}: asCollection(${name}.name, ${name}.schema, ${name}.indexes),`
  ).join('\n');

  const output = `// AUTO GENERATED — DO NOT EDIT
import { Model } from 'papr';
import { asCollection } from '@inaiat/fastify-papr';
${imports}

declare module '@inaiat/fastify-papr' {
  interface FastifyPapr {
${models}
  }
}

export const models = {
${registrations}
};
`.trimStart();

  await mkdir(join(__dirname, '../src/types'), { recursive: true });
  await writeFile(output_file, output);
  console.log("Generated papr types");
}

generate();
