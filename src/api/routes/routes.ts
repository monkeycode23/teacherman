import { Router } from "express";
import authRoutes from "./auth.routes";

import userRoutes from './user.routes';

import classRoomRoutes from './classroom.routes'

import topicRoutes from './topic.routes'

const apiRouter = Router();

// Aquí montamos todos los routers secundarios
apiRouter.use("/auth", authRoutes);
apiRouter.use("/classrooms",classRoomRoutes);
apiRouter.use("/users",userRoutes);
apiRouter.use("/topics",topicRoutes);
export default apiRouter;
