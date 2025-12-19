

import { gql } from "graphql-tag";


export const SessiontypeDefs = gql`

 
  
  type Attendace {
    _id: ID!
    student: Student
    status: String
  }

  type Activity {
    _id: ID!
    title: String
    description: String
    type: String
    completed: Boolean
    order: Int
    progress: Int
  }

  type Session {
    _id: ID!
    title: String
    classroom: Classroom
    sessionDate: String
    endTime: String
    startTime: String
    description: String
    activities: [Activity]
    attendance: [Attendace]
    progress: Int
    status:String
  }

  type PaginationFilter{
    pagination:Pagination
    data:[Session]
  }

  type Attendace {
    student:Student
    status:String
  }

  type SessionActivitiesData {
  activities: [Activity]
  attendance: [Attendace]
}


   type PaginationActivityFilter{
    pagination:Pagination
    data:SessionActivitiesData
  }
  
`;


export const SessionQueries = gql`
  extend type Query {
        getClassroomSessions(classroomId: ID!):PaginationFilter
    getSessionActivities(sessionId:ID!) :PaginationActivityFilter
  }
`;