//task controller file that handle api's

import * as taskService from "../services/taskService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    return successResponse(res, "Task created successfully", task);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const taskController = {
  createTask,
};

export default taskController;
