// User Service File

import models from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

const registerUser = async (userData) => {
    const email = userData.email
    const checkuser = await models.User.findOne({ where: { email } });
    if (checkuser) throw new Error("User Already Exist");

    const user = await models.User.create(userData);
    return user;
};

const loginUser = async (email, password) => {

    const user = await models.User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const payload = { userId: user.id, role: user.role };
    //   const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, user };
    // return { token, user };
};

const refreshAccessToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateAccessToken({ userId: decoded.userId, role: decoded.role });
        return { newAccessToken };
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

export { registerUser, loginUser, refreshAccessToken };
