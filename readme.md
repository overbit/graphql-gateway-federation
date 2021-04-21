# Gateway

```
npm start
```

```gql
query Product {
  product(id: "123") {
    id
    name
    price
  }
}
```

## Open issue

`@internal` directive is still in [draft](https://github.com/apollographql/federation/pull/653) the rename to productPrice (instead of product) is to prevent naming conflicts in the gateway. Ideally the query in the pricing typeDefs looks like:

```gql
extend type Query {
  product(id: String!): Product! @internal
}
```
