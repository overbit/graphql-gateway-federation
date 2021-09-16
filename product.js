const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { importSchema } = require("./import-schema");

const resolvers = {
  Query: {
    product(_, { id }) {
      if (id < 100) {
        // Primary
        return {
          id: id,
          name: "Bike",
          isoType: "BO-190",
        };
      }
      // Secondary
      return {
        id: id,
        name: "Bike",
        description: "some description",
      };
    },
  },
  Product: {
    __resolveType({ id }, context, info) {
      if (id < 100) {
        return "Primary";
      }

      return "Secondary";
    },
  },
};

const typeDefs = importSchema("product-service.graphql");

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`📦 Product service ready at ${url}`);
});
