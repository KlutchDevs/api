//resolver to add new note to API. 
//takes in the note content as an argument, stores it as object, and adds it to memory in notes array
module.exports = {
  newNote: async (parent, args, {models}) => {
    return await models.Note.create({
      content: args.content,
      author: 'Adam Scott'
    });

  /*  //this mutation saves new note to memory. We're using db storage instead

  newNote: (parent, args) => {
  let noteValue = {
    id: String(notes.length + 1),
    content: args.content,
    author: 'Adam Scott'
  };
  notes.push(noteValue);
  return noteValue;
  */
  }
}