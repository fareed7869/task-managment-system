//task model file that create schema

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection.js";

class Task extends Model {}
Task.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "Task",
  }
);

export { Task };
