//Construct a schema, using GraphQL's schema language
//schema values arent separated by commas (i.e. attributes)

 //declare GraphQL schema(const typeDefs = gql`), and then list schema keynames and values

const typeDefs = gql`   
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Mutation {
    newNote(content: String!): Note
  }
`;