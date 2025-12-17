

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

import ResourceService from "../services/resource.service";
import TagModel from "../models/tag.model";
import resourceModel from "../models/resource.model";
import { Request, Response } from "express";



class ResourceController {
  private actionHandler: any;

  constructor() {}


  createAction() {
    return async(req: Request, res: Response, next: any) => {
      try {
        
        const{ title,type,url,thumbnail,classroom } = req.body;

        const upload = await ResourceService.uploadResource(req,classroom)

        const resource = new resourceModel({
            title,
            type,
            url,
            thumbnail,
            uploadedAt:new Date()
        });

        await resource.save();

        ApiResponse.success(res, resource, "resource  created successfully");

        return;
        
      } catch (error) {

        next(error);
      }
      res.send("Project Created");
    };
  }

  getSignatureAction(){

     return (req: Request, res: Response, next: any) => {
      try {
        
        const signature = ResourceService.getUploadSignature()

            ApiResponse.success(res,{signature},"")
      } catch (error) {
        next(error)
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

export default new ResourceController();
