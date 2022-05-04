//this file is used to import our resolvers code into a single exported module

const Query = require('./query');
const Mutation = require('./mutation');
const Note = require('./note');
const User = require('./user');
//use the graphql-iso-date package to validate requests w/ DateTime
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime
};

//for more info on defining and validating custom scalar types
//review: Apollo Server's "Custom scalars and enums" documentation