const { userRegister, userLogin, logoutUser, getUserProfile} = require("../services/userServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const register = async (req, res) => {


    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const { user, message } = await userRegister({ email, password });
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY not defined in environment variables.");
        }

        const token = jwt.sign(
            { data: { id: user._id, email: user.email } },
            process.env.SECRET_KEY
        );
        console.log("Generated token:", token);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(201).json({ message });
        console.log("Saved successfully")
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(400).json({ message: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        const { user, message } = await userLogin({ email, password });
        console.log("User login success");
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY not defined in environment variables.");
        }

        const token = jwt.sign(
            { data: { id: user._id, email: user.email } },
            process.env.SECRET_KEY
        );
        console.log("Generated token:", token);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day

        });
        return res.status(200).json({
            message,
            user: { id: user._id, email: user.email }
        });


    } catch (error) {
        console.error('Error logging in user:', error.message);
        return res.status(400).json({ message: error.message });
    }
}


const logout = async (req, res) => {
    try {
        await logoutUser(res); // logic is now handled in the service
        res.status(200).json({ message: "User Logout Successfully****" });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" });
    }
};

const userProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        const userData = await getUserProfile(id);
        res.json({ data: userData });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, logout, userProfile }