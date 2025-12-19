import { gql } from "graphql-tag";


export const topictypeDefs = gql`

   type Topic {
    _id: ID!
    title: String!
    description: String
    comments: [String]
    resources: [String]
    quizzes: [String]
    events: [String]
    text: String
  }
  
  
`;


export const topicQueries = gql`
  extend type Query {
   getClassroomTopics(classroomId: ID!): [Topic]
  }
`;