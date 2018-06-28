/** Copyright (c) 2018 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import App from 'fusion-core';
import {ApolloServerEndpointToken} from '../tokens.js';
import ApolloServer from '../index';

const app = new App();

app.register(ApolloServerEndpointToken, 'test');

app.register(ApolloServer);

// Failing case for when we can test flow failures
/*
app.register(ApolloServerEndpointToken, 2;
*/
