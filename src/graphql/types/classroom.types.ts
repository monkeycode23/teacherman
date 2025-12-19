import { gql } from "graphql-tag";


export const ClassroomtypeDefs = gql`


  type Teacher {
    _id: ID!
    fullname: String
    user: ID!
  }
  type ClassroomStats {
    topics: Int
    assignments: Int
    students: Int
  }
  type Classroom {
    _id: ID!
    name: String
    description: String
    tags: [Tag]
    subject: String
    teacher: Teacher
    color: String
    students: [String]
    topics: [String]
    assignments: [String]
    stats: ClassroomStats
  }

  


  type PaginationFilterClassrooms {
    pagination: Pagination
    data: [Classroom]
  }

  
`;


export const classroomQueries = gql`
  extend type Query {
     getClassroom(classroomId: ID!): Classroom
    getClassrooms(teacherId: ID!): PaginationFilterClassrooms
    
  }
`;