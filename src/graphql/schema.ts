import { gql } from "graphql-tag";
import { userQueries,UsertypeDefs } from "./types/user.types";
import { ClassroomtypeDefs,classroomQueries } from "./types/classroom.types";
import { studentQueries,studenttypeDefs } from "./types/syudent.types";
import { topicQueries,topictypeDefs } from "./types/topics.types";
import { SessiontypeDefs,SessionQueries } from "./types/session.types";



 



export const typeDefs = gql`

type Query

 type Pagination {
    totalPages: Int
    page: Int
    skip: Int
    limit: Int
    total:Int
  }

    type Tag {
    _id: ID!
    name: String!
    color: String
    icon: String
    text: String
  }

    ${UsertypeDefs}
    ${ClassroomtypeDefs}
    ${studenttypeDefs}
    ${topictypeDefs}
    ${SessiontypeDefs}
 

  ${userQueries}
  ${classroomQueries}
  ${studentQueries}
  ${topicQueries}
  ${SessionQueries}
  
`;
