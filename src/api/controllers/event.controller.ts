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

import { Request, Response } from "express";

import { UserRequest } from "../../types/express";

class EventRoomController {
  private actionHandler: any;

  constructor() {}

createAction() {
    return async (req: UserRequest, res: Response, next: any) => {
      
        try {
            const {title,description,classroom,type,timeStart,timeEnd,date} = req.body;
            const _classroom = await ClassroomModel.findById(classroom);
                 
            if(!_classroom) throw new Error("classroom Not Found");

            const {startDate,endDate } = EventService.checkEventDates(date,timeStart,timeEnd);

            delete req.body.timeStart
            delete req.body.timeEnd

            const event = new eventModel({
                ...req.body,
                startDate:startDate,
                endDate:endDate,
                createdBy:req.userId
            })

            await event.save()
            
            //TODO: agregar al evento a classroom

            _classroom.events.push(event._id)

            await _classroom.save()

            ApiResponse.success(res,event,"event added successfully");

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
export default new EventRoomController();
