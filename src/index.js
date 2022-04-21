const express = require('express');                     //dependencies
const {ApolloServer} = require('apollo-server-express'); //imports apollo-server-express package
require('dotenv').config(); //import configuration

//Local module imports
const db = require('./db');   //import db.js file from src directory
const models = require('./models'); //import all app models 
const typeDefs = require('./schema');
const resolvers = require('./resolvers'); //import resolver code

//Run the server on aport specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;  ////Store the DB_HOST value as a variable

const app = express(); //create app object w/ Express server

db.connect(DB_HOST); //Connect to the database

//Apollo Server setup
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: () => {
    //Add the db models to the context
    return { models };
  }
});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api'});

app.listen({port}, () => 
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
