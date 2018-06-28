// @flow
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createPlugin, type Middleware, type FusionPlugin} from 'fusion-core';
import {graphqlKoa} from 'apollo-server-koa';
import {GraphQLSchemaToken} from 'fusion-apollo';
import type {DepsType, PluginServiceType} from './types';
import {ApolloServerEndpointToken} from './tokens';

const plugin =
  __NODE__ &&
  createPlugin({
    deps: {endpoint: ApolloServerEndpointToken, schema: GraphQLSchemaToken},
    provides: ({schema}) =>
      graphqlKoa(() => ({
        schema,
        tracing: true,
        cacheControl: true,
      })),
    middleware: ({endpoint}, handler): Middleware => (ctx, next) =>
      ctx.path === endpoint ? handler(ctx) : next(),
  });

export default ((plugin: any): FusionPlugin<DepsType, PluginServiceType>);
