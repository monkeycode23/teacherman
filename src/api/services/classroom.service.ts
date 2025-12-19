import { User } from "../models/User.model";
import classSessionModel from "../models/class.session.model";
import classroomModel from "../models/classroom.model";
import mongoose from "mongoose";
import PaginationService from "./pagination.service";

class ClassroomService {
  constructor() {}

  static generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  static async getClassRooms(filter: any) {
    const { teacherId,page,limit } = filter;
    
    const total = await classroomModel.countDocuments()

    const pagination = PaginationService.getPagination({
        page,
        limit,
        total
    })

    const {skip,limit:_limit} = pagination
    //const userService = new UserService()

    const classrooms = await classroomModel.aggregate([
      {
        $match: {
          teacher: new mongoose.Types.ObjectId(teacherId),
        },
      },
      { $skip: skip },
    { $limit: _limit},

      // Students
      {
        $lookup: {
          from: "students",
          localField: "students", // 👈 array de ObjectId
          foreignField: "_id",
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
    
    return {
        pagination,
        data:classrooms};
  }
}

export default ClassroomService;
