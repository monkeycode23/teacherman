
import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";

export  const classRoomResolvers = {

    getClassrooms: async (_: any, args: any) => {
            try {
                
                console.log(args)
                const  data = await ClassroomService.getClassRooms(args);
                console.log(data)
                return data
    
           } catch (error: any) {
                return { error: error.message };
              }
        },
        getClassroom: async (_: any, args: any) => {
          try {
            const { classroomId } = args;
    
            //const userService = new UserService()
    
            const classroom = await classroomModel
              .findById(classroomId)
              /* .populate("topics")
            .populate("students")
            .populate("assignments") */
              .populate("teacher");
    
            return classroom;
          } catch (error: any) {
            return { error: error.message };
          }
        },
}