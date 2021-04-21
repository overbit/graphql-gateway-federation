var { ApolloGateway } = require("@apollo/gateway");
var { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "products", url: "http://localhost:4000" },
    { name: "pricing", url: "http://localhost:5000" },
  ],
});

const server = new ApolloServer({ gateway: gateway });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// app.listen(3000);
// console.log("Running a GraphQL API server at http://localhost:3000/graphql");
