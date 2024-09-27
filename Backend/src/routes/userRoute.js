//User routes

import { Router } from "express";

import { userAuthController } from "../controllers/index.js";

const router = Router();

router.post('/register', userAuthController.register);
router.post('/login', userAuthController.login);

export default router;
