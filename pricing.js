import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const typeDefs = gql`
  extend type Query {
    productPrice(id: String!): Product!
  }

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
  Query: {
    productPrice(_, { id }) {
      return {
        id: id,
      };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`💰 Pricing service ready at ${url}`);
});
