


import { gql } from "graphql-tag";


export const UsertypeDefs = gql`

   type User {
    _id: ID!
    avatar: String
    username: String
    email: String
    passwordHash: String
    roles: [String]
    emailVerified: Boolean
  }
  


  type PaginationFilterClassrooms {
    pagination: Pagination
    data: [Classroom]
  }

  
`;



export const userQueries = gql`
  extend type Query {
    getAuthUser(userId: ID!): User
  }
`;


