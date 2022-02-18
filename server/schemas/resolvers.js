const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username } )=> {
          return User.findOne({ username });
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
        // saveBook: async (parent, { bookId }, context) => {
        //     if (context.user) {
        //       const updatedBooks = await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { $addToSet: { savedBooks: bookId } },
        //         { new: true }
        //       ).populate('savedBooks');
          
        //       return updatedBooks;
        //     }
          
        //     throw new AuthenticationError('You need to be logged in!');
        // },
        // deleteBook: async (parent, { bookId }, context) => {
        //     if (context.user) {
        //       const updatedBooks = await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { $pull: { savedBooks: bookId } },
        //         { new: true }
        //       ).populate('savedBooks');
          
        //       return updatedBooks;
        //     }
          
        //     throw new AuthenticationError('You need to be logged in!');
        // }
    }
};

module.exports = resolvers;