const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./schema/schema");
const config = require("./config");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Start our server with our port config
const url = config.server.url;
server
  .listen({ port: config.server.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
