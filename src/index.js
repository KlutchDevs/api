// index.js
//npm run dev
// This is the main entry point of our application
const express = require('express'); //dependencies
const {ApolloServer, gql} = require('apollo-server-express'); //imports apollo-server-express package
require('dotenv').config(); //import configuration

const db = require('./db');   //import db.js file from src directory

//Run the server on aport specified in our .env file or port 4000
const port = process.env.PORT || 4000;

//Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

let notes = [
  {
    id: '1', 
    content: 'This is a note', 
    author: 'Adam Scott'
  },
  {
    id: '2', 
    content: 'This is another note', 
    author: 'Harlow Everly'
  },
  {
    id: '3', 
    content: 'Oh hey look, another note!', 
    author: 'Riley Harrison'
  }
];

//Construct a schema, using GraphQL's schema language
//schema values arent separated by commas (i.e. attributes)

 //note query that takes required args, returns matching Note
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }
  
  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
  }
  
  type Mutation {
    newNote(content: String!): Note
  }
`;

//Provide resolver functions for our schema fields
//Resolver functions ARE separated by commas
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id); //return matching note
    }
  },
  //resolver to add new note to API. 
  //takes in the note content as an argument, stores it as object, and adds it to memory in notes array
  Mutation: { 
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express(); //create app object w/ Express server

//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api'});

/* prior response method
  We then use the app object’s get method to
  instruct our application to send a response of 
  “Hello World” when a user accesses the root URL (/). 
  
  app.get('/', (req, res) => res.send("Lets see if nodemon is working. -Klutch")); */
//instruct app to run on specific port

app.listen({port}, () => 
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
