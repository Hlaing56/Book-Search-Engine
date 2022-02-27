import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const  SAVE_BOOK = gql`
  mutation Mutation($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
      authors
      title
      bookId
    }
  }
`;

export const  DELETE_BOOK = gql`
  mutation Mutation($bookData: bookInput!) {
    deleteBook(bookData: $bookData) {
      title
      authors
      bookId
    }
  }
`;

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};