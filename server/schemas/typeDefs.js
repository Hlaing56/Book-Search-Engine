const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        
    } 

    input bookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookInput!): Book
        deleteBook(bookData: bookInput!): Book
    }


    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;