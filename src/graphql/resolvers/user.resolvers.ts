

import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";
import SessionService from "../../api/services/session.service";
import UserService from "../../api/services/user.service";


export  const userResolvers = {

     getAuthUser: (_: any, args: any) => {
      try {
        const { userId } = args;

        const userService = new UserService();

        const user = userService.get({ userId });

        return user;
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


    
   