import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { errors, celebrate } from 'celebrate';
import { userCreateValitation } from '../middleware/validations/userCreateValitation';
import { userShowValitation } from '../middleware/validations/userShowValitation';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { AdminMiddleware } from '../middleware/AdminMiddleware';
import { userResetPasswordValitation } from '../middleware/validations/userResetPasswordValitation';
import { userPasswordTemporyValitation } from '../middleware/validations/userPasswordTemporyValitation';

const usersRoutes = Router();

const user = new UserController();

usersRoutes.post("/", celebrate(userCreateValitation), user.create);
usersRoutes.post("/password-temporary", celebrate(userPasswordTemporyValitation), user.resetPassword);
usersRoutes.post("/reset-password", celebrate(userResetPasswordValitation), user.resetPassword);
usersRoutes.use(AuthMiddleware);
usersRoutes.get("/", AdminMiddleware, user.index);
usersRoutes.get("/:id", celebrate(userShowValitation), user.show);

usersRoutes.use(errors());

export { usersRoutes };