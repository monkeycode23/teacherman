import { gql } from "graphql-tag";

export const typeDefs = gql`

type Tag {
    _id: ID!
    name: String!
    color:String
    icon:String
    text:String
    
    
  }


type Project {
    _id: ID!
    name: String
    description: String
    tags:[Tag]

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


  type Query {

  projectTags(projectId: ID!): [Tag]
  projects(userId: ID!): [Project]

  user(userId:ID!):User
  }

  type Mutation {
    createProject(name: String!, description: String): Project
  }

  type Subscription {
    projects: [Project]
  }
`;
