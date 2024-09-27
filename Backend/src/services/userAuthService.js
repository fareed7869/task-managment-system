// User Service File

import models from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (userData) => {
  const user = await models.User.create(userData);
  return user;
};

const loginUser = async (email, password) => {
  const user = await models.User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = { userId: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token, user };
};

export { registerUser, loginUser };
