import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || "7d",
    });
};

export const registerUser = async ({ username, email, password, profileImage }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const user = new User({ username, email, password, profileImage });
    await user.save();

    return {
        token: generateToken(user._id),
        user,
    };
};


export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    return {
        token: generateToken(user._id),
        user,
    };
};