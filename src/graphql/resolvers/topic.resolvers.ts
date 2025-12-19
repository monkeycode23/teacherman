

import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";
import SessionService from "../../api/services/session.service";

export  const topicResolvers = {

    getClassroomTopics: async (_: any, args: any) => {
      try {
        const { classroomId } = args;

        //const userService = new UserService()

        const classroom = await classroomModel
          .findById(classroomId)
          .populate({ path: "topics", model: "Topic" });

        if (!classroom) throw new Error("no class room found");

        return classroom.topics ?? [];
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


