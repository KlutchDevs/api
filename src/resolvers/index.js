//this file is used to import our resolvers code into a single exported module

const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
  Query,
  Mutation
};