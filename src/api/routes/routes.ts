import { Router } from "express";
import authRoutes from "./auth.routes";
import projectRoutes from "./project.routes";
import tagRoutes from "./tag.routes";
import taskRoutes from "./task.routes";
import taskLists from "./taskLists.routes";
import userRoutes from './user.routes';

/* import userRoutes from "./user.routes";
import playerRoutes from './player.routes' */
/* import clienteRoutes from "./clienteRoutes";
import prestamoRoutes from "./prestamoRoutes";
import pagoRoutes from "./pagoRoutes";
import activityRoutes from "./activityRoutes";
import notificationRoutes from "./notificationRoutes";
import roomRoutes from "./roomRoutes"; */

const apiRouter = Router();

// Aquí montamos todos los routers secundarios
apiRouter.use("/auth", authRoutes);
apiRouter.use("/projects",projectRoutes);
apiRouter.use("/tags",tagRoutes);
apiRouter.use("/tasks",taskRoutes);
apiRouter.use("/taskLists",taskLists);
apiRouter.use("/users",userRoutes);

/* apiRouter.use("/users", userRoutes);
apiRouter.use("/players", playerRoutes); */

/* apiRouter.use("/clientes", clienteRoutes);
apiRouter.use("/prestamos", prestamoRoutes);
apiRouter.use("/pagos", pagoRoutes);
apiRouter.use("/activities", activityRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/rooms", roomRoutes); */

export default apiRouter;
