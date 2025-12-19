

import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";
import SessionService from "../../api/services/session.service";
import { eventModel } from "../../api/models/event.model";

export  const studentResolvers = {

     getDayEvents: async (_: any, args: any) => {
      try {
        const { date } = args;
        console.log(date,"fechaaaaaaaaaaaaaa!")
        //const userService = new UserService()
        const day = new Date(date)
        const startOfDay = new Date(day.setHours(0, 0, 0, 0));
        const endOfDay = new Date(day.setHours(23, 59, 59, 999));
        console.log(startOfDay,endOfDay)
        const events = await eventModel.find({
          startDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        }).populate({path:"classroom",select:"_id name color"})

        console.log(events);
        if (!events) throw new Error("no class room found");

        return events;
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 
 
 
