//the following packages give user authentication capabilities 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //client sends request(Payload) with an HTTP Header named Authorization
const mongoose = require('mongoose');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');

module.exports = {
  signUp: async (parent, {username, email, password}, {models}) => {
    //normalize email address
    email = email.trim().toLowerCase();
    //hash the password
    const hashed = await bcrypt.hash(password, 10);
    //create the gravatar url (globall recognized avatar)
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed
      });

      //create and return the json web token
      //JWT_SECRET will read the token from the HTTP Header, decode it
      return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      //if there's a problem creating the account, throw an error
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, {username, email, password}, {models}) => {
    if (email) {
      //normalize email address
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });

    // if no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError('Error signing in');
    }

    //if the passwords don't match, throw an authentication error 
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      throw new AuthenticationError('Error signing in');
    }

    //create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
  //add the users context
  newNote: async (parent, args, {models, user}) => {
    //if there is no user on the context, throw an authentication error
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note');
    }

    return await models.Note.create({
      content: args.content,
      //reference the author's mongo id
      author: mongoose.Types.ObjectId(user.id)
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