import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { authDirective } from "./auth-directive.js";

const typeDefs = gql`
  directive @auth on OBJECT | FIELD_DEFINITION

  extend type Product @key(fields: "id") {
    id: String! @external
    price: Float! @auth
  }
`;

const resolvers = {
  Product: {
    price() {
      console.log("resolver called");
      return 1499;
    },
  },
};

const { authDirectiveTransformer } = authDirective();
const server = new ApolloServer({
  context: ({ req }) => ({ headers: req.headers }),
  schema: authDirectiveTransformer(
    buildSubgraphSchema([{ typeDefs, resolvers }])
  ),
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`💰 Pricing service ready at ${url}`);
});
