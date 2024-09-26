// task service file that handle business logic

import models from "../models/index.js";
import { Op } from 'sequelize';

const createTask = async (taskData) => {
  return await models.Task.create(taskData);
};

// const getAllTasks = async () => {
//   return await models.Task.findAll();
// };

const getAllTasks = async (page, limit) => {
  const offset = (page - 1) * limit;
  const tasks = await models.Task.findAndCountAll({ limit, offset });
  return {
    tasks: tasks.rows,
    totalPages: Math.ceil(tasks.count / limit),
  };
};

const getTaskById = async (id) => {
  return await models.Task.findByPk(id);
};

const updateTask = async (id, taskData) => {
  const task = await models.Task.findByPk(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  await task.update(taskData);
  return task;
};

const deleteTask = async (id) => {
  const task = await models.Task.findByPk(id);
  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  await task.destroy();
};

const searchTasks = async (searchTerm, page, limit) => {
    const offset = (page - 1) * limit;
    const tasks = await models.Task.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
      limit,
      offset,
    });
    return {
      tasks: tasks.rows,
      totalPages: Math.ceil(tasks.count / limit),
    };
  };

  const filteredTaskStatus = async (status, page, limit) => {
    const offset = (page - 1) * limit;
    const tasks = await models.Task.findAndCountAll({
        where: {
            status: status
            
          },
      limit,
      offset,
    });
    return {
      tasks: tasks.rows,
      totalPages: Math.ceil(tasks.count / limit),
    };
  };
  
export { createTask, getAllTasks, getTaskById, updateTask, deleteTask, searchTasks, filteredTaskStatus };
