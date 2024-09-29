//User routes

import { Router } from "express";
import { userAuthController } from "../controllers/index.js";
import { auth } from '../middlewares/authentication.js';

const router = Router();

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);
router.post('/logout', auth, userAuthController.logout);
router.post('/refresh-token', userAuthController.refreshToken);

export default router;
