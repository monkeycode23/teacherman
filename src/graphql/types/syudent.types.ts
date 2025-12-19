


 import { gql } from "graphql-tag";
 
 
 export const studenttypeDefs = gql`

  type Student {
    _id: ID!
    avatar: String
    names: String
    lastname: String
    email: String
    average: Int
    emailVerified: Boolean
    dni: String
    phone: String
    notes: String
    address: String
    code: String
    user: String
  }
 
   
    type PaginationFilterStudents {
    pagination: Pagination
    data: [Student]
  }
   
 `;

    
    export const studentQueries = gql`
      extend type Query {
         getClassroomStudents(classroomId: ID!): PaginationFilterStudents
      }
    `;
    