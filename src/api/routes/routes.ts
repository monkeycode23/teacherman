import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import classRoomRoutes from "./classroom.routes";
import topicRoutes from "./topic.routes";
import eventRoutes from "./event.routes";
import studentRoutes from "./student.routes"
import resourceRoutes from './resource.routes'
import questionRoutes from './question.routes'
import quizzRoutes from './quiz.routes'

const apiRouter = Router();

// Aquí montamos todos los routers secundarios
apiRouter.use("/auth", authRoutes);
apiRouter.use("/classrooms", classRoomRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/topics", topicRoutes);
apiRouter.use("/events", eventRoutes);
apiRouter.use("/students", studentRoutes);
apiRouter.use("/resources", resourceRoutes);
apiRouter.use("/questions", questionRoutes);
apiRouter.use("/quizzes", quizzRoutes);




export default apiRouter;
