const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    productPrice(id: String!): Product!
  }

  extend interface Product {
    id: String! @external
    price: Float!
  }

  extend type Primary @key(fields: "id") {
    id: String! @external
    price: Float!
  }

  extend type Secondary @key(fields: "id") {
    id: String! @external
    price: Float!
  }
`;

const resolvers = {
  Primary: {
    price() {
      return 1499;
    },
  },
  Secondary: {
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
