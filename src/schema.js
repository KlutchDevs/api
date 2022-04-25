//Construct a schema, using GraphQL's schema language
//schema values arent separated by commas (i.e. attributes)

 //declare GraphQL schema, and then list schema keynames and values
 const {gql} = require('apollo-server-express');

 //DateTime is a custom scalar type we'll use to track date and time of note changes & additions
 module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Mutation {
    newNote(content: String!): Note
    updateNote(id: ID!, content: String!): Note!
    delteNote(id: ID!): Boolean! 
  }
`;