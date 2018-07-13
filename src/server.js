// @flow
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createPlugin, type Middleware} from 'fusion-core';
import {graphqlKoa} from 'apollo-server-koa';
import {GraphQLSchemaToken, ApolloContextToken} from 'fusion-apollo';
import {ApolloServerEndpointToken} from './tokens';

const plugin =
  __NODE__ &&
  createPlugin({
    deps: {
      endpoint: ApolloServerEndpointToken,
      schema: GraphQLSchemaToken,
      apolloContext: ApolloContextToken.optional,
    },
    provides: ({schema, context}) =>
      graphqlKoa(ctx => ({
        schema,
        tracing: true,
        cacheControl: true,
        context: typeof apolloContext === 'function' ? apolloContext(ctx) : apolloContext,
      })),
    middleware: ({endpoint}, handler): Middleware => (ctx, next) =>
      ctx.path === endpoint ? handler(ctx) : next(),
  });

export default plugin;
