import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { importSchema } from "./import-schema";
import { Resolvers } from "./__generated_types__/product-service";

const resolvers: Resolvers = {
  Query: {
    product: (_, { id }) => ({
      id,
      name: "Bike",
    }),
  },
};

const typeDefs = importSchema("schemas/product-service.graphql");

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📦 Product service ready at ${url}`);
});
