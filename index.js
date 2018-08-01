const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const typeDefs = require('./schema');

const resolvers = {
    Query: {
        employees: () => {
            return axios.get(`http://localhost:3000/employees`)
                .then(resp => resp.data);
        }    
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});