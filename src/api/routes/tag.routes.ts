import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { createProjectValidationRules } from "../validations/project.validations";
import { createTagValidationRules } from "../validations/tag.validations";
import TagController from "../controllers/tag.controller";

const router = Router();




router.get(
    "/",
    authRequired,
    //requireRole("admin"),
    TagController.getAction());




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
    createTagValidationRules,
    validateRequest,
    TagController.createAction());


    
router.put(
    "/",
    authRequired,
    //requireRole("admin"),
    createProjectValidationRules,
    validateRequest,
    TagController.createAction());



    
router.delete(
    "/",
    authRequired,
    //requireRole("admin"),
    createProjectValidationRules,
    validateRequest,
    TagController.createAction());



export default router;