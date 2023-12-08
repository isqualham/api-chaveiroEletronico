import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { usersRoutes } from "./users.routes";


const router = Router();

router.use("/user", usersRoutes);
router.use("/auth", authRoutes);

export { router };