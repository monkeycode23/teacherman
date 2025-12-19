



import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";
import SessionService from "../../api/services/session.service";
 
export  const sessionResolvers = {

     getClassroomSessions:async(_: any, args: any) => {
      try {
       
        return await SessionService.getClassroomSessions(args);

      } catch (error: any) {
        console.log(error)
        return { error: error.message };
      }
    }, 

    getSessionActivities:async(_: any, args: any) => {
      try {
       
        const response:{
            pagination:any
            data:any
        } = await SessionService.getSessionActivities(args);
        
       console.log(response)
        return {
            pagination:response.pagination,
            data:response.data[0]
        }

      } catch (error: any) {
        console.log(error)
        return { error: error.message };
      }
    },
}

 