var { ApolloGateway } = require("@apollo/gateway");
var { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceHealthCheck: true,

  experimental_pollInterval: 5000,
  experimental_didFailComposition: (error) => {
    console.log(error);
  },

  serviceList: [
    { name: "products", url: "http://localhost:4000" },
    { name: "pricing", url: "http://localhost:5000" },
  ],
});

const server = new ApolloServer({ gateway: gateway, subscriptions: false });
server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`🚏 Gateway service ready at ${url}`);
});
