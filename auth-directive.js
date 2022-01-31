import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

export const authDirective = () => {
  const typeDirectiveArgumentMaps = {};
  return {
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const directives = getDirective(schema, type, "auth");
          const authDirective = directives ? directives[0] : null;
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const directives = getDirective(schema, fieldConfig, "auth");
          const authDirective = directives
            ? directives[0]
            : typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = function (source, args, context, info) {
              if (!context.headers.authorization) {
                throw new Error("not authorized");
              }

              return resolve(source, args, context, info);
            };

            return fieldConfig;
          }
        },
      }),
  };
};
