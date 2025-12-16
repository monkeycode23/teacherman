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
import TagModel from "../models/tag.model";
import TaskModel from "../models/task.model";

import { Request, Response } from "express";
import taskListModel from "../models/taskList.model";

class TaskController {
  private actionHandler: any;

  private project: any;
  private task: any;
  private taskList: any;
  constructor() {
    this.taskList = null;
    this.project = null;
    this.task = null;
  }

  getAction() {
    return async (req: Request, res: Response, next: any) => {
      try {
        const task = await TaskModel.find();

        ApiResponse.success(res, task, "Project created successfully");

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
        const { title, priority, projectId, assignedTo, taskListId } = req.body;

        const project = await ProjectModel.findById(projectId);

        if (!project) throw new Error("no project found");

        const taskList = await taskListModel
          .findById(taskListId)
          .populate({ path: "tasks", select: "_id status" });

        if (!taskList) throw new Error("no task list found");

        //TODO: VALIDAR assignedTo que sea colaborador

        const task = new TaskModel({
          title,
          priority,
          taskList:taskListId,
          status: "pending",
          createdBy: "6935c39bdf46d9cd6b9d74ea",
          project: projectId,
          assignedTo: assignedTo || "6935c39bdf46d9cd6b9d74ea",
          deadLine: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        });

        //TODO: actualizar el progress del tasklist
        // ← Asegúrate que tasks es un array con ref

        const totalTasksList = taskList.tasks.length + 1;
        const completedTasksList = taskList.tasks.filter(
          (task: any) => task.status === "completed"
        ).length;
        const taskListProgress = Math.floor(
          (completedTasksList / totalTasksList) * 100
        );

        taskList.progress = taskListProgress;

        //TODO: actualizar el progress del prpojecto

        const totalTasks = await TaskModel.countDocuments({
          project: projectId,
        });
        const completed = await TaskModel.countDocuments({
          project: projectId,
          status: "completed",
        });

        const projectProgress = Math.floor(
          (completed / (totalTasks + 1)) * 100
        );

        project.progress = projectProgress;

        taskList.tasks.push(task._id);

        await task.save();

        await taskList.save();

        await project.save();

        //console.log(tag)
        ApiResponse.success(
          res,
          { task, projectProgress, taskListProgress },
          "Project created successfully"
        );

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

    return async (req: Request, res: Response, next: any) => {
      //res.send("Project Created");
      try {
        const { taskId } = req.params;

        const { title, priority, createdBy, status } = req.body;

        const data = { ...req.body };

         this.task = await TaskModel.findById(taskId);


          if (!this.task) throw new Error("no task found");


          await this.validate({
            project:this.task.project,
            taskList:this.task.taskList 
          })

        
        const task = await TaskModel.findByIdAndUpdate(taskId, data, {
          new: true,
        });

  
        //TODO: actualizar progress

        if (status) {
         
          const progress = await this.updateProgress()

          ApiResponse.success(
            res,
            { task,...progress },
            "task updated successfully"
          );

          return;
        }

        ApiResponse.success(res, task, "task updated successfully");

        return;
      } catch (error) {
        next(error);
      }
    };
  }

  async validate(data: any) {
    this.project = await ProjectModel.findById(data.project);

    if (!this.project) throw new Error("no project found");

    console.log(data);
    this.taskList = await taskListModel
      .findById(data.taskList)
      .populate({ path: "tasks", select: "_id status" });

    if (!this.taskList) throw new Error("no task list found 1");
  }

  async updateProgress() {
    const totalTasks = await TaskModel.countDocuments({
      project: this.task.project,
    });
    const completed = await TaskModel.countDocuments({
      project: this.task.project,
      status: "completed",
    });

    const projectProgress = Math.floor((completed / totalTasks) * 100);
    this.project.progress = projectProgress;
    await this.project.save();

    //task list progress
    const totalTasksList = await TaskModel.countDocuments({
      taskList: this.task.taskList,
    });

    const completedTasksList = await TaskModel.countDocuments({
      taskList: this.task.taskList,
      status: "completed",
    });

    /* const recalCulateCompleted = this.task.status === "completed" ?
            completedTasksList + 1 : completedTasksList - 1;
            */
    let taskListProgress = 0;
    if (totalTasksList) {
      taskListProgress = Math.floor(
        (completedTasksList / totalTasksList) * 100
      );
    }

    this.taskList.progress = taskListProgress;

    await this.taskList.save();

    return { projectProgress, taskListProgress };
  }

  async deleteTaskRecursively(taskId: string) {
    try {
      // Encontrar la tarea por ID
      const task = await TaskModel.findById(taskId);
      if (!task) return; // Si no existe, salir

      // Si tiene subTasks, eliminarlas recursivamente
      if (task.subTasks && task.subTasks.length > 0) {
        for (const subTaskId of task.subTasks) {
          await this.deleteTaskRecursively(String(subTaskId));
        }
      }

      // Finalmente, eliminar la tarea principal
      await TaskModel.findByIdAndDelete(taskId);

      console.log(`Task ${taskId} eliminada correctamente.`);
    } catch (error) {
      console.error(`Error eliminando task ${taskId}:`, error);
    }
  }
  deleteAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return async (req: Request, res: Response, next: any) => {
      try {
        const { taskId } = req.params;
        this.task = await TaskModel.findByIdAndDelete(taskId);

        if (!this.task) throw new Error("TASK NOT FOUND");

        await this.validate({
          project: this.task.project,
          taskList: this.task.taskList,
        });

        await this.deleteTaskRecursively(String(this.task._id));

        const progress = await this.updateProgress();

        this.taskList.tasks = this.taskList.tasks.filter(
          (t: any) => t._id != this.task._id
        );

        this.taskList.save();

        ApiResponse.success(
          res,
          { task: this.task, ...progress },
          "Se ha eliminado la tarea exitosamente",
          200
        );
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
  }
}

export default new TaskController();
