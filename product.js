import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql`
  extend type Query {
    product(id: String!): Product!
  }

  type Product @key(fields: "id") {
    id: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    product: (_, { id }) => {
      return {
        id: id,
        name: "Bike",
      };
    },
  },
};

const server = new ApolloServer({
  context: ({ req }) => ({ headers: req.headers }),
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📦 Product service ready at ${url}`);
});
