//task routes

import { Router } from "express";

import { taskController } from "../controllers/index.js";

const router = Router();

router.post("/createTask", taskController.createTask);
router.get("/getAllTask", taskController.getTasks);
router.get("/getTaskById/:id", taskController.getTask);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/removeTask/:id", taskController.deleteTask);

export default router;
