var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
    type Query {
        product(id: String!): Product!
    }
    type Product {
        id: String!
        name: String!
    }
`);

var root = {
  product: ({ id }) => ({
    id: id,
    name: "Bike",
  }),
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
