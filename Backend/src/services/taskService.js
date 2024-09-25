// task service file that handle business logic

import models from "../models/index.js";

const createTask = async (taskData) => {
  return await models.Task.create(taskData);
};

export { createTask };
