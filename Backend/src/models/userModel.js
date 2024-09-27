// User Model

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection.js";
import bcrypt from "bcryptjs";

class User extends Model {}
User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "User",
  }
);

// Hash password before saving the user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export { User };
