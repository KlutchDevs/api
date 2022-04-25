//Our GraphQL schema 
//schema values arent separated by commas (i.e. attributes)

 //declare GraphQL schema, and then list schema keynames and values
 const {gql} = require('apollo-server-express');

 //DateTime is a custom scalar type we'll use to track date and time of note changes & additions
 module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
  }
  
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Mutation {
    newNote(content: String!): Note
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean! 
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;