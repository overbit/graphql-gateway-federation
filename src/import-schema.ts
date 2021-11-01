import { readFileSync } from "fs";
import { join, resolve } from "path";
import { parse, Source } from "graphql";

export function importSchema(fileName: string) {
  const schemaPath = join(resolve(process.cwd(), __dirname), fileName);
  const rawSchema = readFileSync(schemaPath, "utf-8").trim();

  return parse(new Source(rawSchema));
}
