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

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    return successResponse(res, "Tasks fetched successfully", tasks);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return errorResponse(res, "Task not found", 404);
    }
    return successResponse(res, "Task fetched successfully", task);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    return successResponse(res, "Task updated successfully", task);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    return successResponse(res, "Task deleted successfully");
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

const taskController = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};

export default taskController;
