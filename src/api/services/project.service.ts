import { User } from "../models/User.model";
import projectModel from "../models/project.model";

class ProjectService {
  constructor() {}

  get(filters: any) {
    const { userId } = filters;

    if (userId) {
      const user = User.findById(userId);

      if (!user) throw new Error("no user found");

      return user;
    }

    return {};
  }

  async getTags(filters: any) {
    const { projectId } = filters;

    if (projectId) {
      const project:any =await  projectModel.findById(projectId)
      .select("_id tags")
      .populate({path:"tags"});

      console.log(projectId,project)

      if (!project) throw new Error("no user found");


      return project.tags;
    }

   return {
    _id:"pepe",
    name:"puto",
    color:"chango"
   }
  }
}

export default ProjectService;
