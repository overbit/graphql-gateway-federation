import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "apollo-server";

const gateway = new ApolloGateway({
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.authorization) {
          request.http.headers.set("authorization", context.authorization);
        }
      },
    });
  },
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "products", url: "http://localhost:4000" },
      { name: "pricing", url: "http://localhost:5000" },
    ],
  }),
});

const server = new ApolloServer({
  context: ({ req }) => ({ authorization: req.headers.authorization }),
  gateway,
  subscriptions: false,
});

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚏 Gateway service ready at ${url}`);
});
