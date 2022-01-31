# Gateway

This example shows how to implement a custom directive on a subgraph. Prices can only be retrieved for users with an `authorization` header.

```
npm start
```

Goto the gateway at: http://localhost:3000/

```gql
query Product {
  product(id: "123") {
    id
    name
    price
  }
}
```

This will now return a `not authorized` result. If you a `authorization` header, with any value. The request will come through as expected.
