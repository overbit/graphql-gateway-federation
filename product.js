const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    product(id: String!): Product!
  }
  type Product @key(fields: "id") {
    id: String!
    name: String!
  }
`;

const product = (_, { id }) => {
  return {
    id: id,
    name: "Bike",
  };
};

const resolvers = { Query: { product } };

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📦 Product service ready at ${url}`);
});
