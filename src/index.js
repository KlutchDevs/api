const cors = require('cors');
const helmet = require('helmet'); //helmet middleware for web best practices/security/HTTP Header formatting 
const express = require('express');                     //dependencies
const {ApolloServer} = require('apollo-server-express'); //imports apollo-server-express package
const jwt = require('jsonwebtoken'); //user authentication 
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
app.use(helmet());  //add helmet middleware to express app
app.use(cors());  //have app use Cross-Origin Resource Sharing 

db.connect(DB_HOST); //Connect to the database

// get the user info from a JWT (JSON web token)
const getUser = token => {
  if (token) {
    try {
      //return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      //if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

//Apollo Server setup
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => {
    //get the user token from the headers
    const token = req.headers.authorization;
    //try to retrieve a user with the token
    const user = getUser(token);
    //for now, let's log the user to the console:
    console.log(user);
    //Add the db models and the user to the context
    return { models, user };
  }
});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api'});

app.listen({port}, () => 
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
