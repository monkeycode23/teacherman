import { Request, Response } from "express";
import { User } from "../../../models/User.model";
import { HashService } from "../../../services/password.service";
import { AuthService } from "../../../services/auth.service";
import { ApiResponse } from "../../../utils/api.response";
import { AuthError } from "../../../errors/error.handler";
import classroomModel from "../../../models/classroom.model";
import studentModel from "../../../models/student.model";
import { ValidationError } from "../../../errors/error.handler";


type StudentUpdatableData = {

    names?:string
    lastname?:string
    email?:string
    dni?:string
    phone?:string
    address?:string
}


class UpdateAction {
  private student: any;
  private classroom: any;
  private SUCCESS_MESSAGE = "user login successfully";

  constructor() {
    this.student = null;
    this.classroom = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const body = req.body;
      const { studentId, classroomId } = req.params;

      await this.validate(classroomId, studentId);


      if (body.incription) {
        //midificar la fecha de inscription en el classroom
        await this.updateIncription(body.incription)
        delete body.inscription
      }

      
      await this.updateStudenData({
        ...body
      })
      

      await this.classroom.save()
      await this.student.save()
    } catch (error) {
      next(error);
    }
  }


  async updateStudenData(data:StudentUpdatableData){

        this.student =await studentModel.findByIdAndUpdate(this.student._id,data,{new:true})
  }

  async updateIncription(date:Date) {
    
    

   /*  await classroomModel.updateOne({_id:this.classroom._id, "incriptions.student":this.student._id}, {
    $set: {
      "inscription.$.date": date,
    },
  })  */

    const updatedInscriptions =  this.classroom.inscription.map((ins:any)=>{
        if(ins.student == this.student._id) return {
            ...ins,
            date
        }
        return ins
    }) 
   

    this.classroom.inscription = updatedInscriptions
    
  }

  async validate(classroomId: string, studentId: string) {
    this.classroom = await classroomModel.findById(classroomId);

    if (!this.classroom) throw new ValidationError("Class room not found ");

    this.student = await studentModel.findById(studentId);
    if (!this.student) throw new ValidationError("student not found ");
  }
}

export default UpdateAction;
