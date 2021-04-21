var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

var schema = buildSchema(`
    type Query {
        product(id: String!): Product!
    }

    type Product {
      id: String!
      price: Float!
    }
`);

var root = {
  product: ({ id }) => ({
    id: id + "---",
    price: 1499,
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

app.listen(5000);
console.log("Running a GraphQL API server at http://localhost:5000/graphql");
