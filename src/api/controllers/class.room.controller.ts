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

import { Request, Response } from "express";

class ClassRoomController {
  private actionHandler: any;

  constructor() {}

createAction() {
    return async (req: Request, res: Response, next: any) => {
      
        try {
            const {name,teacher,subject,color} = req.body;
            const classRoom = new ClassroomModel({
                name,
                teacher,
                subject,
                color
            })

            await classRoom.save()

            
            ApiResponse.success(res,classRoom,"class room added successfully");

        } catch (error) {
            next(error)
        }
    };
  }


  updateAction() {

    return async (req: Request, res: Response, next: any) => {
      try {
            const {name,subject,color} = req.body;
            const {classRoomId} = req.params;

            const classRoom = await ClassroomModel.findByIdAndUpdate(classRoomId,{
                name,
                subject,
                color
            })
            ApiResponse.success(res,classRoom,"class room updated successfully");

        } catch (error) {
            next(error)
        }
    };
  }


  
  deleteAction() {

    return async (req: Request, res: Response, next: any) => {
      try {
            const {classRoomId} = req.params;
            const classRoom = await ClassroomModel.findByIdAndDelete(classRoomId);

            if(!classRoom)throw new Error("class Room not found")

            //TODO: eliminar  topics
            
            //TODO: eliminar students

            //eliminar sessiones

            //eliminar tareas

            
            ApiResponse.success(res,classRoom,"class room deleted successfully");

        } catch (error) {
            next(error)
        }
    };
  }

}
export default new ClassRoomController();
