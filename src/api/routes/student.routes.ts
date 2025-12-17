import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
//import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";

import classRoomController from "../controllers/class.room.controller";

import eventController from "../controllers/event.controller";
import { createEventValidationRules } from "../validations/events.validations";

import studentController from "../controllers/student.controller";


const router = Router();




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
    /* createEventValidationRules,
    validateRequest, */
    studentController.createAction());


    
router.put(
    "/:classroomId/:studentId",
    authRequired,
    //requireRole("admin"),
   /*  createProjectValidationRules,
    validateRequest, */
    studentController.updateAction());



    
router.delete(
    "/:classroomId/:studentId",
    authRequired,
    //requireRole("admin"),
    /* createProjectValidationRules,
    validateRequest, */
     studentController.deleteAction());



export default router;