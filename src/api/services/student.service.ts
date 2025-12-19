import { User } from "../models/User.model";
import studentModel from "../models/student.model";
import mongoose from "mongoose";
import PaginationService from "./pagination.service";
import classroomModel from "../models/classroom.model";
class StudentService {
  constructor() {}

  static generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  static async getClassroomStudents(filter: any) {
    const { classroomId, page, limit } = filter;

    console.log(filter);

    const classroom = await classroomModel
      .findById(classroomId)
      .select("_id students");

    if (!classroom) throw new Error("class room not found");

    const total = classroom.students.length;

    const pagination = PaginationService.getPagination({
      page,
      limit,
      total,
    });

    const { skip, limit: _limit } = pagination;

     const query:any = await classroomModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(classroomId),
        },
      },

      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "students",
          pipeline: [

            {
              $project: {
                _id: 1,
                lastname: 1,
                names: 1,
                code: 1,
                email: 1,
                phone: 1,
                address: 1,
                dni: 1,
                notes: 1,
              },
            },
          ],
        },
      },

      {
        $project: {
          _id: 1,
          name:1,
          students: 1,
        },
      },

   

      // Limpieza (opcional pero recomendado)
    ]); 

  /*   const students = await classroomModel.findById(classroomId)

    .populate({
        path:"students",
       
    }) */

    console.log(query);

    return {
      pagination,
      data: query[0].students,
    };
  }
}

export default StudentService;
