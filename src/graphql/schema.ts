import { gql } from "graphql-tag";

export const typeDefs = gql`

type Tag {
    _id: ID!
    name: String!
    color:String
    icon:String
    text:String
    
    
  }

  type Topic {
    _id: ID!
    title: String!
    description:String
    comments:[String]
    resources:[String]
    quizzes:[String]
    events:[String]
    text:String
    
    
  }
  type Teacher {
  _id: ID!
  fullname:String
    user: ID!
  
  }


  type ClassroomStats {
    topics:Int
    assignments:Int
    students:Int
  }
type Classroom {
    _id: ID!
    name: String
    description: String
    tags:[Tag]
    subject:String
    teacher:Teacher
    color:String
    students:[String]
    topics:[String]
    assignments:[String]
    stats:ClassroomStats
    }


    type User{
        _id:ID!
        avatar:String
        username:String
        email:String
        passwordHash:String
        roles:[String]
        emailVerified:Boolean
    }

 type Event{
        _id:ID!
        title:String
        type:String
        classroom:Classroom
        startDate:String
        endDate:String
        description:String
        color:String
        progress:Int
    }


  type Query {
  getDayEvents(date:String!):[Event]
   getClassroom(classroomId: ID!): Classroom
  getClassrooms(teacherId: ID!): [Classroom]
  getClassroomTopics(classroomId: ID!): [Topic]
  user(userId:ID!):User
  }

`;
