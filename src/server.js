// @flow
/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {createPlugin, type Middleware, createToken} from 'fusion-core';
import {graphqlKoa} from 'apollo-server-koa';
import {GraphQLSchemaToken, ApolloContextToken} from 'fusion-apollo';
import {ApolloServerEndpointToken} from './tokens';
import fs from 'fs';
import type {Token} from 'fusion-core';
export const UploadDirToken: Token<string> = createToken(
  'UploadDirToken'
);
import { apolloUploadKoa } from 'apollo-upload-server';

const plugin =
  __NODE__ &&
  createPlugin({
    deps: {
      endpoint: ApolloServerEndpointToken,
      schema: GraphQLSchemaToken,
      apolloContext: ApolloContextToken.optional,
      uploadDir: UploadDirToken,
    },
    provides: ({schema, apolloContext, uploadDir = 'upload'}) => {
      apolloUploadKoa({
        uploadDir,
      }),
      async function(ctx, next) {
        let { file } = ctx.request.body.variables;
        if (ctx.request.is('multipart/form-data'))
          fs.rename(file.path, uploadDir + file.name)
        await next()
      },
      graphqlKoa(ctx => ({
        schema,
        tracing: true,
        cacheControl: true,
        context:
          typeof apolloContext === 'function'
            ? apolloContext(ctx)
            : apolloContext,
      }))
    },
    middleware: ({endpoint}, handler): Middleware => (ctx, next) =>
      ctx.path === endpoint ? handler(ctx) : next(),
  });

export default plugin;
