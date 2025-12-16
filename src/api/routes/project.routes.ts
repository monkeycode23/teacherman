import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { createProjectValidationRules } from "../validations/project.validations";


const router = Router();


router.get(
    "/",
    authRequired,
    //requireRole("admin"),
   
    projectController.getAction());


    router.get(
    "/statics",
    authRequired,
    //requireRole("admin"),
   
    projectController.getStaticsAction());



router.get(
    "/:projectId",
    authRequired,
    //requireRole("admin"),
   
    projectController.getAction());




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
    createProjectValidationRules,
    validateRequest,
    projectController.createAction());


    
router.put(
    "/",
    authRequired,
    //requireRole("admin"),
    createProjectValidationRules,
    validateRequest,
    projectController.createAction());



    
router.delete(
    "/:projectId",
    authRequired,
    //requireRole("admin"),
    /* createProjectValidationRules,
    validateRequest, */
    projectController.deleteAction());



export default router;