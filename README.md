# fusion-plugin-apollo-server

[![Build status](https://badge.buildkite.com/c931c046e7af2b778aaa22cc9de5255c5ba012aedc63feb595.svg?branch=master)](https://buildkite.com/uberopensource/fusion-plugin-apollo-server)

This plugin connects GraphQL schema to your Fusion.js server, allowing you to host a web server and graphql endpoint within the same Fusion.js project. This is most useful when used with [fusion-apollo](https://github.com/fusionjs/fusion-apollo) and [fusion-apollo-universal-client](https://github.com/fusionjs/fusion-apollo-universal-client).

---

# Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Registration API](#registration-api)
    - [`ApolloServerEndpointToken`](#apolloserverendpointtoken)

---

### Installation

```sh
yarn add fusion-plugin-apollo-server
```

---

### Usage

To use the apollo server create a schema. The schema can be provided using the GraphQLSchemaToken from fusion-apollo.
See the [Apollo Documentation](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) for how to generate a schema.

```js
import ApolloServer, {ApolloServerEndpointToken} from 'fusion-plugin-apollo-server';
import {GraphQLSchemaToken} from 'fusion-apollo';
import {makeExecutableSchema} from 'graphql-tools';

export default () => {
  ...
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '...');
  app.register(GraphQLSchemaToken, makeExecutableSchema(...));
  ...
};
```

---

### API

#### Registration API

##### ApolloServerEndpointToken

```js
import {ApolloServerEndpointToken} from 'fusion-plugin-apollo-server';
```

This should be registered to a string representing the desired GraphQL endpoint. If using [fusion-apollo-universal-client](https://github.com/fusionjs/fusion-apollo-universal-client), this will likely be the same value as `ApolloClientEndpointToken.

##### ApolloContextToken

This can be used to transform the koa context into an apollo context.

```js
import {ApolloContextToken} from 'fusion-apollo';

app.register(ApolloContextToken, ctx => {
  return {
    httpContext: ctx,
    otherContext: SOMEOHTERCONTEXT
  };
});
```
