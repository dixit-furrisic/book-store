import { registerUser, loginUser } from "../services/auth.service.js";


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profileImage = req.file?.path || "";

        const { token, user } = await registerUser({ username, email, password, profileImage });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { token, user } = await loginUser({ email, password });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};