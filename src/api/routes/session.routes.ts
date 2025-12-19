import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
//import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";

import classRoomController from "../controllers/class.room.controller";

import eventController from "../controllers/event.controller";
import { createEventValidationRules } from "../validations/events.validations";

import sessionController from "../controllers/session.controller";
const router = Router();




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
    /* createEventValidationRules,
    validateRequest, */
    sessionController.createAction());


    
router.put(
    "/",
    authRequired,
    //requireRole("admin"),
   /*  createProjectValidationRules,
    validateRequest, */
    classRoomController.createAction());



    
router.delete(
    "/",
    authRequired,
    //requireRole("admin"),
    /* createProjectValidationRules,
    validateRequest, */
    classRoomController.createAction());



export default router;