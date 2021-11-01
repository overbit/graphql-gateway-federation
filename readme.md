# Gateway

```
npm start
```

Post the following to `http://localhost:3000/` using Postman, or the [GraphQL Sandbox Explorer](https://studio.apollographql.com/sandbox/explorer/)

```gql
query {
  product(id: "12") {
    id
    name
    price
  }
}
```
