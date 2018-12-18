const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const server = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
  ping: String!
}
`);

// The root provides a resolver function for each API endpoint
var root = {
  ping: () => {
    return 'I am Alive!';
  },
};

server.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = 7777;

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});
