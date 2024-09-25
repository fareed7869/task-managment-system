//task routes

import { Router } from "express";

import { taskController } from "../controllers/index.js";

const router = Router();

router.post("/createTask", taskController.createTask);

export default router;
