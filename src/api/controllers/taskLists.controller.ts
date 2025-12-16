
import { ApiResponse } from "../utils/api.response";

import ProjectModel from "../models/project.model";
import TagModel from "../models/tag.model";
import TaskModel from "../models/task.model";
import taskListModel from "../models/taskList.model";

import { Request, Response } from "express";

class TaskController {
  private actionHandler: any;

  constructor() {}

  getListAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const { taskListId } = req.params;
        console.log(req.params);

        if (!taskListId) throw new Error("no task list id provided");

        const taskList = await taskListModel
          .findById(taskListId)
          .populate({
            path: "tasks",
            populate: [{ path: "assignedTo" }, { path: "createdBy" }],
          })
          .populate({ path: "tags" })
          .populate({ path: "createdBy", select: "_id avatar username" })
          .populate({ path: "leader", select: "_id avatar username" });

        ApiResponse.success(res, taskList, "lista de tareas ");

        return;
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

        if (!projectId) throw new Error("no project id provided");

        const taskLists = await taskListModel
          .find({ project: projectId })
          .populate({
            path: "tasks",
            populate: [{ path: "assignedTo" }, { path: "createdBy" }],
          })
          .populate({ path: "tags" })
          .populate({ path: "createdBy", select: "_id avatar username" })
          .populate({ path: "leader", select: "_id avatar username" });

        ApiResponse.success(res, taskLists, "lista de tareas ");

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
        const { name, description, tags, projectId } = req.body;

        const taskList = new taskListModel({
          name,
          description,
          tags,
          project: projectId,
          leader: "6935c39bdf46d9cd6b9d74ea",
          collaborators: ["6935c39bdf46d9cd6b9d74ea"],
          createdBy: "6935c39bdf46d9cd6b9d74ea",
          deadLine: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });

        //TODO: REMPLAZAR  POR USERID  const userId = req.user._id
        const task = new TaskModel({
          title: "Tarea de prueba ...",
          taskList: taskList._id,
          priority: "low",
          status: "pending",
          createdBy: "6935c39bdf46d9cd6b9d74ea",
          asignedTo: "6935c39bdf46d9cd6b9d74ea",
          project: projectId,
          deadLine: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });

        await task.save();

        taskList.tasks.push(task._id);

        await taskList.save();

        const project = await ProjectModel.findById(projectId);

        project!.taskLists.push(taskList._id);

        await project!.save();

        await taskList.save();

        const data = await taskListModel
          .findById(taskList._id)

          .populate([
            { path: "tags" },
            {
              path: "tasks",
              populate: [{ path: "assignedTo" }, { path: "createdBy" }],
            },
          ])
          .populate({ path: "createdBy", select: "_id avatar username" })
          .populate({ path: "leader", select: "_id avatar username" });

        ApiResponse.success(res, data, "Project created successfully");

        return;
      } catch (error) {
        next(error);
      }
    };
  }

  updateAction() {

    
    return async (req: Request, res: Response, next: any) => {
      try {
        const { taskListId } = req.params;
        const data = req.body;

        const _taskList = await taskListModel.findById(taskListId);

        if (!_taskList) throw new Error("no task found");

        const project = await ProjectModel.findById(_taskList.project);

        if (!project) throw new Error("no project found");

        //quitar datos no relacionados a la colleccion

        const task = await taskListModel.findByIdAndUpdate(
          taskListId,
          req.body,
          { new: true }
        ).populate("tags")

        if (!task) throw new Error("no task found");
        console.log(task);

        if(req.body.tags){
           const projectTags = project.tags;

        const filtertags =  [...projectTags,...data.tags.filter((t:any)=>!projectTags.includes(t))]

        console.log(filtertags)
         project.tags = filtertags

        await project.save() 

        }

       

        ApiResponse.success(res, task, "task list updated successfully");

        return;
      } catch (error) {
        next(error);
      }
    };
  }
  deleteAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
}

export default new TaskController();
