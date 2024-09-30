// User Controller

import * as userAuthService from "../services/userAuthService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { registerSchema, loginSchema } from "../validators/userAuthValidators.js";

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
        // const { token, user } = await userAuthService.loginUser(
        //   req.body.email,
        //   req.body.password
        // );
        const { accessToken, refreshToken, user } = await userAuthService.loginUser(
            req.body.email,
            req.body.password
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        // return successResponse(res, "Login successful", { token, user });
        return successResponse(res, "Login successful", { user });
    } catch (error) {
        return errorResponse(res, error.message, 401);
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return errorResponse(res, "Refresh token is required", 403);

    try {
        const { newAccessToken } = await userAuthService.refreshAccessToken(
            refreshToken
        );
        const options = {
            httpOnly: true,
            secure: true,
        };
        res.cookie("accessToken", newAccessToken, options);
        return successResponse(res, "Token refreshed");
    } catch (error) {
        return errorResponse(res, error.message, 403);
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return successResponse(res, "Logged out successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
};

const userAuthController = {
    register,
    login,
    refreshToken,
    logout,
};

export default userAuthController;
