import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
//import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { createProjectValidationRules } from "../validations/project.validations";
import { createClassRoomValidationRules } from "../validations/tag.validations";
import { createTopicValidationRules } from "../validations/topic.validations";
import classRoomController from "../controllers/class.room.controller";
import topicController from "../controllers/topic.controller";
const router = Router();




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
    createTopicValidationRules,
    validateRequest,
    topicController.createAction());


    
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