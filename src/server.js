// @flow
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  createPlugin,
  type Context,
  type FusionPlugin,
  type Middleware,
} from 'fusion-core';
import {graphqlKoa} from 'apollo-server-koa';
import {GraphQLSchemaToken, ApolloContextToken} from 'fusion-apollo';
import {ApolloServerEndpointToken} from './tokens';

type ApolloServerDepsType = {
  endpoint: typeof ApolloServerEndpointToken.optional,
  schema: typeof GraphQLSchemaToken,
  apolloContext: typeof ApolloContextToken.optional,
};

type ApolloServerType = Context => Promise<void>;

type PluginType = FusionPlugin<ApolloServerDepsType, ApolloServerType>;

const pluginFactory: () => PluginType = () =>
  createPlugin({
    deps: {
      endpoint: ApolloServerEndpointToken.optional,
      schema: GraphQLSchemaToken,
      apolloContext: ApolloContextToken.optional,
    },
    provides: ({schema, apolloContext}) =>
      graphqlKoa(ctx => ({
        schema,
        tracing: true,
        cacheControl: true,
        context:
          typeof apolloContext === 'function'
            ? apolloContext(ctx)
            : apolloContext,
      })),
    middleware: ({endpoint = '/graphql'}, handler): Middleware => (ctx, next) =>
      ctx.path === endpoint ? handler(ctx) : next(),
  });

export default ((__NODE__ && pluginFactory(): any): PluginType);
