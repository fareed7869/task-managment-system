//task routes

import { Router } from "express";
import { taskController } from "../controllers/index.js";
import { auth } from '../middlewares/authentication.js';
import { authorize } from '../middlewares/authorization.js';

const router = Router();

router.post("/createTask", taskController.createTask);
router.get("/getAllTask",auth, taskController.getTasks);
router.get("/getTaskById/:id", taskController.getTask);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/removeTask/:id",auth,authorize(['admin']), taskController.deleteTask);
router.get('/search', taskController.searchTasks);
router.get('/filteredTaskStatus', taskController.filteredTaskStatus);


export default router;
