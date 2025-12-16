
import UserService from "../api/services/user.service";
import { AuthService } from "../api/services/auth.service";
import ProjectService from "../api/services/project.service";
// authRequired.ts (middleware de resolver)
import { GraphQLError } from "graphql";

export const authRequired = (resolverFn: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const authHeader = context.req?.headers?.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new GraphQLError("No token provided");
    }

    try {
      const decoded: any = await AuthService.verifyAccessToken(token);
      context.user = decoded.data;
    } catch {
      throw new GraphQLError("Invalid or expired token");
    }

    return resolverFn(parent, args, context, info);
  };
};


export const resolvers = {
  Query: {
    user:(_:any,args:any)=>{
        try {
            
            const {userId} = args;
    
            const userService = new UserService()
    
            const user = userService.get({userId})
    
            return user
        } catch (error:any) {
            return {error:error.message}
        }
        
    }
    ,
     projectTags: async (_:any,args:any) => {

      try {
        
        console.log(args)
         const {projectId} = args;
    
      const projectService = new ProjectService()

      return await projectService.getTags({projectId})
      
        

    } catch (error:any) {
        console.log(error)
        
        return {error:error.message}
      }
      
    },

    projects: async () => {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      return data.data; // ajustalo según tu formato de respuesta
    }
  }
};
