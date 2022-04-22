//this file is used to import our resolvers code into a single exported module

const Query = require('./query');
const Mutation = require('./mutation');
//use the graphql-iso-date package to validate requests w/ DateTime
const { GraphQLDate } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};

//for more info on defining and validating custom scalar types
//review: Apollo Server's "Custom scalars and enums" documentation