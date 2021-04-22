const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const RATINGS_REST_API = "http://localhost:3333";

const typeDefs = gql`
  extend type Product @key(fields: "id") {
    id: String! @external
    rating: String!
  }
`;

const resolvers = {
  Product: {
    async rating({ id }) {
      const response = await fetch(`${RATINGS_REST_API}/ratings?productId=${id}`);
      const { rating } = await response.json();
      return rating;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 5555 }).then(({ url }) => {
  console.log(`⭐️ Ratings service ready at ${url}`);
});
