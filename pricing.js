import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql`
  extend type Product @key(fields: "id") {
    id: String! @external
    price: Float!
  }
`;

const resolvers = {
  Product: {
    price() {
      return 1499;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`💰 Pricing service ready at ${url}`);
});
