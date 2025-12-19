


import { gql } from "graphql-tag";


export const typeClassroomDefs = gql`
 
    type Event {
    _id: ID!
    title: String
    type: String
    classroom: Classroom
    startDate: String
    endDate: String
    description: String
    color: String
    progress: Int
  }
  


  type PaginationFilterClassrooms {
    pagination: Pagination
    data: [Classroom]
  }

  
`;







export const eventQueries = gql`
  extend type Query {
    getDayEvents(date: String!): [Event]
  }
`;
