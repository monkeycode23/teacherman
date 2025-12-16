import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { createProjectValidationRules } from "../validations/project.validations";
import { createTagValidationRules } from "../validations/tag.validations";
import TagController from "../controllers/tag.controller";
import taskController from "../controllers/task.controller";
import { createTaskValidationRules } from "../validations/task.validations";


const router = Router();

router.get(
  "/",
  authRequired,
  //requireRole("admin"),
  taskController.getAction()
);




router.post(
  "/",
  authRequired,
  createTaskValidationRules,
  validateRequest,
  taskController.createAction()
);

router.put(
  "/:taskId",
  authRequired,
  //requireRole("admin"),
  /* createTagValidationRules,
    validateRequest, */
  taskController.updateAction()
);

router.delete(
  "/:taskId",
  authRequired,
  //requireRole("admin"),
  /* createProjectValidationRules,
  validateRequest, */
  taskController.deleteAction()
);

export default router;
