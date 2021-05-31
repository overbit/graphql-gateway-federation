const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    product(id: String!): Product!
  }

  type Product @key(fields: "id") {
    id: String!
    name: String!
    # price: String!
  }
`;
const resolvers = {
  Query: {
    product(_, { id }) {
      return {
        id: id,
        name: "Bike",
      };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📦 Product service ready at ${url}`);
});
