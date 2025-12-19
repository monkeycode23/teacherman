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
import ClassroomModel from "../models/classroom.model";
import { eventModel } from "../models/event.model";
import EventService from "../services/event.service";
import SessionActivity from "../models/activity.model";

import { Request, Response } from "express";
import classSessionModel from "../models/class.session.model";
import { UserRequest } from "../../types/express";

class ClassSessionController {
  private actionHandler: any;

  constructor() {}

  createAction() {
    return async (req: UserRequest, res: Response, next: any) => {
      try {
        const { description, classroomId, timeStart, timeEnd, date } = req.body;

        const classroom = await ClassroomModel.findById(classroomId);

        if (!classroom) throw new Error("classroom Not Found");

        const event = new classSessionModel({
          ...req.body,
          title: classroom.name + " sesion",
          sessionDate: date,
          startTime: timeStart,
          endTime: timeEnd,
          description: description ?? "",
          classroom:classroomId
        });

        const activity1 = new SessionActivity({
          type: "attendance",
          order: 1,
          completed: false,
          title: "Lista de Asistencia",
        });

       

        const activity2 = new SessionActivity({
          type: "exercises",
          order: 2,
          completed: false,
          title: "test activity...",
        });


         await activity1.save();
        await activity2.save();

        event.activities = [activity1._id, activity2._id];

        await event.save();

        classroom.sessions.push(event._id);

        await classroom.save();

        ApiResponse.success(res, event, "session created successfully");
      } catch (error) {
        next(error);
      }
    };
  }

  updateAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { name, subject, color } = req.body;
        const { classRoomId } = req.params;

        const classRoom = await ClassroomModel.findByIdAndUpdate(classRoomId, {
          name,
          subject,
          color,
        });
        ApiResponse.success(res, classRoom, "class room updated successfully");
      } catch (error) {
        next(error);
      }
    };
  }

  deleteAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { classRoomId } = req.params;
        const classRoom = await ClassroomModel.findByIdAndDelete(classRoomId);

        if (!classRoom) throw new Error("class Room not found");

        //TODO: eliminar  topics

        //TODO: eliminar students

        //eliminar sessiones

        //eliminar tareas

        ApiResponse.success(res, classRoom, "class room deleted successfully");
      } catch (error) {
        next(error);
      }
    };
  }
}
export default new ClassSessionController();
