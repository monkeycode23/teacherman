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

import ProjectModel from "../models/project.model";

import { Request, Response } from "express";
import taskListModel from "../models/taskList.model";
import taskModel from "../models/task.model";

class ProjectController {
  private actionHandler: any;

  constructor() {}

  getStaticsAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        // Contar todos los proyectos por estado
        const pending = await ProjectModel.countDocuments({
          status: "pending",
        });
        const inprogress = await ProjectModel.countDocuments({
          status: "inprogress",
        });
        const completed = await ProjectModel.countDocuments({
          status: "completed",
        });

        const result = {
          pending,
          inprogress,
          completed,
          total: pending + inprogress + completed,
        };

        console.log(result);

        return ApiResponse.success(res, result, "Project statistics fetched");
      } catch (error) {
        next(error);
      }
    };
  }

  getAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { projectId } = req.params;
        console.log(req.params);

        if (projectId) {
          const project = await ProjectModel.findById(projectId);

          ApiResponse.success(res, project, "Project fetched successfully");

          return;
        }

        const projects = await ProjectModel.find();

        ApiResponse.success(res, projects, "Project created successfully");

        return;
      } catch (error) {
        next(error);
      }
      res.send("Project Created");
    };
  }

  createAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { name, description, projectManager } = req.body;

        //const projectManager = req
        // .user?._id;

       

        const project = new ProjectModel({
          name,
          description,
          status: "pending",
          projectManager,
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });

        

        //TODO:  CAMBIAR EL USAURIO POR EL DEL LA SESSION const userId = req.user._id
         const task = new taskModel({

          deadline: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
          createdBy: "6935c39bdf46d9cd6b9d74ea",
          project: project._id,
          assignedTo: "6935c39bdf46d9cd6b9d74ea",
          priority: "high",
          status: "pending",
          title: "Ponermee a laburar en este projecto!!",
        });
        const list = new taskListModel({
          project: project._id,
          createdBy:"6935c39bdf46d9cd6b9d74ea",
          name: "test task list",
          leader: "6935c39bdf46d9cd6b9d74ea",
          collaborators: ["6935c39bdf46d9cd6b9d74ea"],
          tasks: [task._id],
        });

        await task.save();
        await list.save();

        project.taskLists.push(list._id);

        await project.save();

        ApiResponse.success(res, project, "Project created successfully");

        return;
      } catch (error) {
        next(error);
      }
     
    };
  }

  updateAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
  deleteAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return async (req: Request, res: Response, next: any) => {
      try {
        const { projectId } = req.params;
        if (!projectId) throw new Error("no project id provided");

        const project = await ProjectModel.findByIdAndDelete(projectId).populate({path:"taskLists",select:"_id tasks" });

        if (!project) throw new Error("no project found");

        const taskLists = project.taskLists;


        if (taskLists.length) {
          taskLists.forEach(async (lists: any) => {
            await taskModel.deleteMany({ _id: { $in: lists.tasks } });
          });

        }

        const taskListsIds = taskLists.map((list: any) => list._id);

        await taskListModel.deleteMany({ _id: { $in: taskListsIds } });


        //TODO: elimiar el projecto del usuario
        /**!SECTION
         *  const userId = req.user._id;
         * const  update = await  User.updateById(userId,{
         * projects:{$pull:project._id},
         * clients:{$pull:{$in:projects.clients}}
         * })
         */
        //TODO: elimiar el clientes del usuario
        /**!SECTION
         *  const userId = req.user._id;
         * const  update = await  User.updateById(userId,{
         * projects:{$pull:project._id}
         * })
         */


        ApiResponse.success(res, project, "Project deleted successfully");
        return;
      } catch (error) {
        next(error);
      }

      res.send("Project Created");
    };
  }
}

export default new ProjectController();
