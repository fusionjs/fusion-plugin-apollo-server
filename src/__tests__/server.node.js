// @flow
import {getSimulator} from 'fusion-test-utils';
import App from 'fusion-core';
import tape from 'tape-cup';
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools';
import ApolloServer from '../index';
import {
  ApolloServerEndpointToken,
  ApolloServerFormatFunctionToken,
} from '../tokens';
import {GraphQLSchemaToken} from 'fusion-apollo';
import type {Context} from 'fusion-core';

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

tape('handler should serve queries on the specified endpoint', async t => {
  const app = new App('el', el => el);
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '/graphql');
  app.register(GraphQLSchemaToken, schema);

  const simulator = getSimulator(app);
  const ctx: Context = await simulator.request('/graphql', {
    body: query,
    method: 'POST',
  });
  t.equal(ctx.status, 200);
  t.equal(JSON.parse(String(ctx.body)).data.getHello.name, 'Hello World');
  t.end();
});

tape('Downstream Error handling should work', async t => {
  const app = new App('el', el => el);
  app.middleware((ctx, next) => {
    throw new Error('FAIL');
  });
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '/graphql');
  app.register(GraphQLSchemaToken, schema);

  const simulator = getSimulator(app);
  try {
    await simulator.request('/graphql', {
      body: query,
      method: 'POST',
    });
    t.fail('Should not reach this');
  } catch (e) {
    t.ok(e, 'has error');
    t.end();
  }
});

tape('Upstream Error handling should work', async t => {
  const app = new App('el', el => el);
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '/graphql');
  app.register(GraphQLSchemaToken, schema);
  app.middleware((ctx, next) => {
    throw new Error('FAIL');
  });

  const simulator = getSimulator(app);
  try {
    await simulator.request('/graphql', {
      body: query,
      method: 'POST',
    });
    t.fail('Should not reach this');
  } catch (e) {
    t.ok(e, 'has error');
    t.end();
  }
});

tape('Format error', async t => {
  const schema = makeExecutableSchema({
    typeDefs,
  });

  addMockFunctionsToSchema({
    schema,
    mocks: {
      Test: () => {
        throw new Error('resolver error');
      },
    },
  });

  const app = new App('el', el => el);
  app.register(ApolloServer);
  app.register(ApolloServerEndpointToken, '/graphql');
  const formatError = error => {
    return {text: 'formatted error'};
  };
  app.register(GraphQLSchemaToken, schema);
  app.register(ApolloServerFormatFunctionToken, formatError);

  const simulator = getSimulator(app);
  const ctx: Context = await simulator.request('/graphql', {
    body: query,
    method: 'POST',
  });
  const response = JSON.parse(String(ctx.body));

  t.deepEqual(response.errors[0], {text: 'formatted error'});
  t.end();
});
