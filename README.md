# fusion-plugin-apollo-server

[![Build status](https://badge.buildkite.com/c931c046e7af2b778aaa22cc9de5255c5ba012aedc63feb595.svg?branch=master)](https://buildkite.com/uberopensource/fusion-plugin-apollo-server)

This plugin connects GraphQL schema to your Fusion.js server. Most useful when used with [fusion-apollo](https://github.com/fusionjs/fusion-apollo) and [fusion-apollo-universal-client](https://github.com/fusionjs/fusion-apollo-universal-client).

# Usage 
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
