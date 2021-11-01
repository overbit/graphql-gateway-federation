import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { importSchema } from "./import-schema";
import { Resolvers } from "./__generated_types__/pricing-service";

const resolvers: Resolvers = {
  Product: {
    price() {
      return 1499;
    },
  },
};

const typeDefs = importSchema("schemas/pricing-service.graphql");

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`💰 Pricing service ready at ${url}`);
});
