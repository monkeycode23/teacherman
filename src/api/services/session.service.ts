import { User } from "../models/User.model";
import classSessionModel from "../models/class.session.model";
import mongoose from "mongoose";
import PaginationService from "./pagination.service";
import { abort } from "node:process";

class SessionService {
  constructor() {}

  static async getClassroomSessions(args: any) {
    const { classroomId, pagination, filter } = args;

    const total = await classSessionModel.countDocuments({
      classroom: new mongoose.Types.ObjectId(classroomId),
    });


    const _pagination = PaginationService.getPagination({
      page:pagination ? ( pagination.page ?? 1) :1,
      limit: pagination ? (pagination.limit ?? 10) :5,
      total,
    });

    console.log(_pagination);

    const sessions = await classSessionModel.aggregate([
      {
        $match: {
          classroom: new mongoose.Types.ObjectId(classroomId),
        },
      },

      { $skip: _pagination.skip },
      { $limit: _pagination.limit },

      {
        $lookup: {
          from: "sessionactivities",
          localField: "activities",
          foreignField: "_id",
          as: "activities",
        },
      },
       {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroom",
          pipeline:[
            {
                $project:{
                    _id:1,
                    color:1,
                    name:1
                }
            }
          ]
        },
      },
      {
      $addFields: {
        classroom: { $arrayElemAt: ["$classroom", 0] }
      }
    },



      {
        $addFields: {
          stats: {
            activities: { $size: "$activities" },
          },
        },
      },

      // Limpieza (opcional pero recomendado)
      {
        $project: {
         
          _id:1,
          title:1,
          description:1,
          sessionDate:1,
          startTime:1,
          endTime:1,
          progress:1,
          status:1,
          stats:1,
          classroom:1
        },
      },
    ]);

    console.log(_pagination)
    console.log(sessions);
    console.log(sessions[0].classroom)

    return {
      pagination: _pagination,
      data: sessions,
    };
  }

  static async getClassroomSession(filter: any) {
    const { classroomId } = filter;

    const sessions = await classSessionModel.aggregate([
      {
        $match: {
          classroom: new mongoose.Types.ObjectId(classroomId),
        },
      },
      {
        $lookup: {
          from: "activities",
          localField: "activities",
          foreignField: "_id",
          as: "activities",
        },
      },

      /* {
            $addFields: {
              stats: {
                activities: { $size: "$activities" },
                
              },
            },
          }, */

      // Limpieza (opcional pero recomendado)
      /* {
            $project: {
              activities: 0,
            },
          }, */
    ]);

    console.log(sessions);

    return sessions;
  }


   static async getSessionActivities(args: any) {
    const { sessionId, pagination, filter } = args;

    const session = await classSessionModel.findById(sessionId).select("_id activities");
    
    if(!session) throw new Error("Session not found ")

    const total = session?.activities.length


    const _pagination = PaginationService.getPagination({
      page:pagination ? ( pagination.page ?? 1) :1,
      limit: pagination ? (pagination.limit ?? 10) :5,
      total,
    });

    console.log(_pagination);

    const sessions = await classSessionModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(sessionId),
        },
      },
      { $skip: _pagination.skip },
      { $limit: _pagination.limit },
      {
        $lookup: {
          from: "sessionactivities",
          localField: "activities",
          foreignField: "_id",
          as: "activities",
          pipeline:[
            {
                $project:{
                    _id:1,
                    type:1,
                    title:1,
                    completed:1,
                    order:1,
                    progress:1,
                    createdAt:1
                    
                }
            }
          ]
        },
      },
  
      // Limpieza (opcional pero recomendado)
      {
        $project: {
          activities:1,
          attendance:1
        },
      },
    ]);

    console.log(_pagination)
    console.log(sessions);
    

    return {
      pagination: _pagination,
      data: sessions,
    };
  }

  static generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

export default SessionService;
