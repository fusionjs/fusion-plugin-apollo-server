// @flow
import {createToken, type Token} from 'fusion-core';

export const ApolloServerEndpointToken: Token<string> = createToken(
  'ApolloServerEndpointToken'
);

export const ApolloServerFormatFunctionToken: Token<Function> = createToken(
  'ApolloServerFormatFunctionToken'
);
