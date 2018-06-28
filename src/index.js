// @flow
import serverPlugin from './server';

export {ApolloServerEndpointToken} from './tokens';

export default (__NODE__ ? serverPlugin : null);
