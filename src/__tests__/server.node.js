// @flow
import {getSimulator} from 'fusion-test-utils';
import App from 'fusion-core';
import tape from 'tape-cup';
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import ApolloServer from '../index';
import {ApolloServerEndpointToken} from '../tokens';
import {GraphQLSchemaToken} from 'fusion-apollo';

const typeDefs = `
type Query {
   getHello: Test
}

type Test {
   name: String
}
`;

const query = {
  operationName: null,
  variables: {},
  query: `query Test { getHello { name }}`,
};

export const schema = makeExecutableSchema({
  typeDefs,
});

addMockFunctionsToSchema({schema});

tape('teast handler servers on the specified endpoint', async t => {
  const app = new App('el', el => el);
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '/graphql');
  app.register(GraphQLSchemaToken, schema);

  const simulator = getSimulator(app);
  const response = await simulator.request('/graphql', {
    body: query,
    method: 'POST',
  });
  t.equal(response.status, 200);
  t.equal(JSON.parse(response.body).data.getHello.name, 'Hello World');
  t.end();
});
