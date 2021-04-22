const { readFileSync } = require("fs");
const { join, resolve } = require("path");
const { parse, Source } = require("graphql");

module.exports.importSchema = function (fileName) {
  const schemaPath = join(resolve(process.cwd(), __dirname), fileName);
  const rawSchema = readFileSync(schemaPath, "utf-8").trim();
  return parse(new Source(rawSchema));
};
