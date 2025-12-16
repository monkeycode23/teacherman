import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { createProjectValidationRules } from "../validations/project.validations";

import taskController from "../controllers/task.controller";
import taskListController from "../controllers/taskLists.controller";
import { createTaskListValidationRules } from "../validations/taskList.validations";

const router = Router();

router.get(
  "/:projectId",
  authRequired,
  //requireRole("admin"),

  taskListController.getAction()
);

router.get(
  "/list/:taskListId",
  authRequired,
  //requireRole("admin"),

  taskListController.getListAction()
);

router.post(
  "/",
  authRequired,
  //requireRole("admin"),
  createTaskListValidationRules,
  validateRequest,
  taskListController.createAction()
);

router.put(
  "/:taskListId",
  authRequired,
  //requireRole("admin"),

  taskListController.updateAction()
);



    
router.delete(
    "/:taskListId",
    authRequired,
    //requireRole("admin"),
    createProjectValidationRules,
    validateRequest,
    projectController.createAction());

/*  router.get(
    "/statics",
    //authRequired,
    //requireRole("admin"),
   
    projectController.getStaticsAction());



router.get(
    "/:projectId",
    //authRequired,
    //requireRole("admin"),
   
    projectController.getAction());








 */

export default router;
