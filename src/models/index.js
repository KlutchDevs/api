//Import our note model & add it to a 'models' object for export
//combines our models into single JavaScript module
const Note = require('./note');
const User = require('./user');

const models = {
  Note,
  User
};

module.exports = models;