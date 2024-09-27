// User Controller

import * as userAuthService from "../services/userAuthService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import Joi from "joi";

//use joi validations
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return errorResponse(res, error.details[0].message, 400);

  try {
    const user = await userAuthService.registerUser(req.body);
    return successResponse(res, "User registered successfully", user);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return errorResponse(res, error.details[0].message, 400);

  try {
    const { token, user } = await userAuthService.loginUser(
      req.body.email,
      req.body.password
    );
    return successResponse(res, "Login successful", { token, user });
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

const userAuthController = {
  register,
  login,
};

export default userAuthController;
