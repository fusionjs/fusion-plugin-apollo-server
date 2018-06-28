// @flow

import type {Context} from 'fusion-core';
import {GraphQLSchemaToken} from 'fusion-apollo';
import {ApolloServerEndpointToken} from './tokens';

export type PluginServiceType = {
  from: (
    ctx?: Context
  ) => {
    ctx?: Context,
    value: string,
  },
};

export type DepsType = {|
  endpoint: typeof ApolloServerEndpointToken,
  schema: typeof GraphQLSchemaToken,
|};
