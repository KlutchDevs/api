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
    //now all new notes will accurately record and cross-reference the author from the context of the request
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    //add the favoriteCount property
    favoriteCount: {
      type: Number,
      default: 0
    },
    //add the favoritedBy property
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
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