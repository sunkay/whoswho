const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const typeDefs = require('./schema');

// Global config options for the whoswho
const config = {
    port: 4000,
    url: 'http://localhost',
    params: {
      api_key: '4e911a064e43b9cd6fbb3137c572d89a',
    },
  };

const resolvers = {
    Query: {
        employees: () => {
            return axios.get(`http://localhost:3000/employees`)
                .then(resp => resp.data);
        },    
        managers: () => {
            return axios.get(`http://localhost:3000/managers`)
                .then(resp => resp.data);
        },    
        employee: (root, args) => {
            return axios.get(`http://localhost:3000/employees/${args.id}`)
                .then(resp => resp.data);
        },    
        manager: (root, args) => {
            return axios.get(`http://localhost:3000/managers/${args.id}`)
                .then(resp => resp.data);
        },
    },

    Mutation: {
        addEmployee(_, args){
            console.log(" args: ", args)
            return
        }
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
});

// Start our server with our port config
server
  .listen({ port: config.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
