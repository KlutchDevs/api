//Require the mongoose library
const mongoose = require('mongoose');

//Define the note's database schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    //apply cross-referencing to the data in our db
    //now all new notes will accurately record and cross-ref the author from the context of the request
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    //Assigns createdAt and updatedAt fields with a Date type
    timestamps: true 
  }
);

//Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema);
//Export the module
module.exports = Note;