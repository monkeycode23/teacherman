import UserService from "../api/services/user.service";
import { AuthService } from "../api/services/auth.service";
import classroomModel from "../api/models/classroom.model";
import mongoose from "mongoose";
// authRequired.ts (middleware de resolver)
import { GraphQLError } from "graphql";

export const authRequired = (resolverFn: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const authHeader = context.req?.headers?.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new GraphQLError("No token provided");
    }

    try {
      const decoded: any = await AuthService.verifyAccessToken(token);
      context.user = decoded.data;
    } catch {
      throw new GraphQLError("Invalid or expired token");
    }

    return resolverFn(parent, args, context, info);
  };
};

export const resolvers = {
  Query: {
    user: (_: any, args: any) => {
      try {
        const { userId } = args;

        const userService = new UserService();

        const user = userService.get({ userId });

        return user;
      } catch (error: any) {
        return { error: error.message };
      }
    },
    getClassrooms: async (_: any, args: any) => {
      try {
        const { teacherId } = args;

        //const userService = new UserService()

        const classrooms = await classroomModel.aggregate([
          {
            $match: {
              teacher: new mongoose.Types.ObjectId(teacherId),
            },
          },

          // Students
          {
            $lookup: {
              from: "students",
              localField: "_id",
              foreignField: "classroom",
              as: "students",
            },
          },

          // Topics
          {
            $lookup: {
              from: "topics",
              localField: "_id",
              foreignField: "classroom",
              as: "topics",
            },
          },

          // Assignments
          {
            $lookup: {
              from: "assignments",
              localField: "_id",
              foreignField: "classroom",
              as: "assignments",
            },
          },

          // Agregar campo `stats` con los totales
          {
            $addFields: {
              stats: {
                students: { $size: "$students" },
                topics: { $size: "$topics" },
                assignments: { $size: "$assignments" },
              },
            },
          },

          // Limpieza (opcional pero recomendado)
          {
            $project: {
              students: 0,
              topics: 0,
              assignments: 0,
            },
          },
        ]);

        return classrooms;
      } catch (error: any) {
        return { error: error.message };
      }
    },
     getClassroom: async (_: any, args: any) => {
      try {
        const { classroomId } = args;

        //const userService = new UserService()

        const classroom = await classroomModel.findById(classroomId)
        /* .populate("topics")
        .populate("students")
        .populate("assignments") */
        .populate("teacher")

        return classroom;
      } catch (error: any) {
        return { error: error.message };
      }
    },
    getClassroomTopics:async (_: any, args: any) => {
      try {
        const { classroomId } = args;

        //const userService = new UserService()
       
        const classroom = await classroomModel.findById(classroomId)
        .populate({path:"topics",model:"Topic"})

        if(!classroom) throw new Error("no class room found")

            
        return classroom.topics ?? [];

      } catch (error: any) {
        return { error: error.message };
      }
    },
  },
};
