/* import LoginAction from "./actions/auth/login.action";
import RegisterAction from "./actions/auth/register.action";
import VerifyAction from "./actions/auth/verify.action";
import LogoutAction from "./actions/auth/logout.action";
import ResendAction from "./actions/auth/resend.action";
import RefreshAction from "./actions/auth/refresh.action";
import ForgotEmailAction from "./actions/auth/forgot/forgotemail.action";
import ForgotCodeAction from "./actions/auth/forgot/forgotcode.action";
import ForgotResetAction from "./actions/auth/forgot/forgot.reset.action";
 */
import { ApiResponse } from "../utils/api.response";

import TagModel from "../models/tag.model";
import StudentModel from "../models/student.model";

import { Request, Response } from "express";
import classroomModel from "../models/classroom.model";
import { ValidationError } from "../errors/error.handler";
import StudentService from "../services/student.service";
import studentModel from "../models/student.model";
import UpdateAction from "./actions/student/update.action";

class StudentController {
  private actionHandler: any;

  constructor() {}

  createAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { names, lastname, classroomId, studentId,inscription } = req.body;

        const classroom = await classroomModel.findById(classroomId);

        if (!classroom) throw new ValidationError("Class room not found ");

        let student;

        if (!studentId) {
          //generar codigo para entrar aula
          //si es un studiante nuevo crearlo
          const code = StudentService.generateCode();
          student = new StudentModel({
            names,
            lastname,
            code,
          });
        } else {
          //si no buscarlo 
          student = await studentModel.findById(studentId);
          if (!student) throw new ValidationError("student not found ");
        }

        //agregarlo al classrom
        classroom.students.push(student._id);
        //agregar la fecha de inscription al classroom

        classroom.inscriptions.push({
          student: student._id,
          date: inscription ?? new Date(),
        });

        await student.save();
        await classroom.save();

        ApiResponse.success(res, student, "Student added successfully");

        return;
      } catch (error) {
        next(error);
      }
      res.send("Project Created");
    };
  }

  updateAction() {
     const update = new UpdateAction();
        this.actionHandler = update.request.bind(update); 
        return this.actionHandler 
  }



  deleteAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return async (req: Request, res: Response, next: any) => {
      try {
        const { studentId, classroomId } = req.params;

        const classroom = await classroomModel.findByIdAndDelete(classroomId);
        if (!classroom) throw new Error("class Room not found");

        /*  const student = await StudentModel.findByIdAndDelete(studentId);
        if (!student) throw new Error("class Room not found"); */

        //TODO: sacar estudnet del aula
        classroom.students.filter((student) => {
          return String(student._id) != studentId;
        });
        
        await classroom.save();

        //TODO: eliminar students

        //eliminar sessiones

        //eliminar tareas

        ApiResponse.success(
          res,
          {},
          "student  removed from classrooom successfully"
        );
      } catch (error) {
        next(error);
      }
    };
  }
}

export default new StudentController();
