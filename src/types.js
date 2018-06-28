// @flow

import type {Context} from 'fusion-core';
import type {GraphQLSchemaToken} from 'fusion-apollo';
import type {ApolloServerEndpointToken} from './tokens';

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
