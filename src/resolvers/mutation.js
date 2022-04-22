//resolver to add new note to API. 
//takes in the note content as an argument, stores it as object, and adds it to memory in notes array
module.exports = {
  newNote: async (parent, args, {models}) => {
    return await models.Note.create({
      content: args.content,
      author: 'Adam Scott'
    });
  },
  deleteNote: async (parent, {id}, {models}) => {
    try {
      await models.Note.findOneAndRemove({_id: id});
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, {content, id}, {models}) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content 
        }
      },
      {
        new: true
      }
    );
  }
}