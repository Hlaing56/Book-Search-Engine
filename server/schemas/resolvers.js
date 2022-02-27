const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
      user: async (parent, { username } )=> {
        return User.findOne({ username });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
          if (context.user) {
            const updatedBooks = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
              { new: true }
            );
            return updatedBooks;
          }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteBook: async (parent, { bookData }, context) => {
          if (context.user) {
            const updatedBooks = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: bookData } },
              { new: true }
            );
            return updatedBooks;
          }
          throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;