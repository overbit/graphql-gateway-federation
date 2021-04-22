const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { importSchema } = require("./import-schema");

const typeDefs = importSchema("product-service.graphql");

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
