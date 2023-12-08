import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { errors, celebrate } from 'celebrate';
import { authCreateValitation } from '../middleware/validations/authCreateValitation';
import { RefreshTokenController } from '../controllers/RefreshTokenController';

const authRoutes = Router();

const authController = new AuthController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/", celebrate(authCreateValitation), authController.create);
authRoutes.post("/refresh-token", refreshTokenController.create);

authRoutes.use(errors());

export { authRoutes };