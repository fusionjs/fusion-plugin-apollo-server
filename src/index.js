// @flow
import serverPlugin from './server';
import type {DepsType, PluginServiceType} from './types';
import type {FusionPlugin} from 'fusion-core';

export {
  ApolloServerEndpointToken,
  ApolloServerFormatFunctionToken,
} from './tokens';

const plugin = __NODE__ ? serverPlugin : null;
export default ((plugin: any): FusionPlugin<DepsType, PluginServiceType>);
