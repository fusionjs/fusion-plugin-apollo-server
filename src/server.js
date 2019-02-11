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
import {
  ApolloServerEndpointToken,
  ApolloServerFormatFunctionToken,
} from './tokens';

type ApolloServerDepsType = {
  endpoint: typeof ApolloServerEndpointToken.optional,
  schema: typeof GraphQLSchemaToken,
  apolloContext: typeof ApolloContextToken.optional,
  formatError: typeof ApolloServerFormatFunctionToken.optional,
};

type ApolloServerType = Context => Promise<void>;

type PluginType = FusionPlugin<ApolloServerDepsType, ApolloServerType>;

const pluginFactory: () => PluginType = () =>
  createPlugin({
    deps: {
      endpoint: ApolloServerEndpointToken.optional,
      schema: GraphQLSchemaToken,
      apolloContext: ApolloContextToken.optional,
      formatError: ApolloServerFormatFunctionToken.optional,
    },
    provides: ({schema, formatError, apolloContext = ctx => ctx}) => {
      return graphqlKoa(ctx => ({
        schema,
        tracing: true,
        cacheControl: true,
        formatError,
        context:
          typeof apolloContext === 'function'
            ? // $FlowFixMe
              apolloContext(ctx)
            : apolloContext,
      }));
    },
    middleware: ({endpoint = '/graphql'}, handler): Middleware => async (
      ctx,
      next
    ) => {
      await next();
      if (ctx.path === endpoint) {
        return handler(ctx);
      }
    },
  });

export default ((__NODE__ && pluginFactory(): any): PluginType);
