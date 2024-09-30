//task routes

import { Router } from "express";
import { taskController } from "../controllers/index.js";
import { auth } from '../middlewares/authentication.js';
import { authorize } from '../middlewares/authorization.js';

const router = Router();

router.post("/createTask",auth, taskController.createTask);
router.get("/getAllTask",auth, taskController.getTasks);
router.get("/getTaskById/:id",auth, taskController.getTask);
router.put("/updateTask/:id",auth, taskController.updateTask);
router.delete("/removeTask/:id",auth,authorize(['admin']), taskController.deleteTask);
router.get('/search',auth, taskController.searchTasks);
router.get('/filteredTaskStatus',auth, taskController.filteredTaskStatus);


export default router;
