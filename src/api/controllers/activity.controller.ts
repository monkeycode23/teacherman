

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
import activityModel from "../models/activity.model";

import { Request, Response } from "express";

class ActivityController {
  private actionHandler: any;

  constructor() {}


  createAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        
        const{ title,description,type, } = req.body;
      

        const tag = new activityModel({
            name,
           type,
           description
        });

        await tag.save();

        ApiResponse.success(res, tag, "Activity created successfully");

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

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
}

export default new ActivityController();
