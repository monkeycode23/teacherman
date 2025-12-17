

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


import TagModel from "../models/tag.model";

import { Request, Response } from "express";

class StudentController {
  private actionHandler: any;

  constructor() {}

 getAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        const tags = await TagModel.find();
        

        ApiResponse.success(res, tags, "Project created successfully");

        return;
        
      } catch (error) {

        next(error);
      }
      res.send("Project Created");
    };
  }


  createAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        
        const{ name,color } = req.body;
      

        const tag = new TagModel({
            name,
           color
        });

        await tag.save();

        ApiResponse.success(res, tag, "Project created successfully");

        return;
        
      } catch (error) {

        next(error);
      }
      res.send("Project Created");
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

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
}

export default new StudentController();
