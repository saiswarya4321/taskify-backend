const bcrypt = require('bcrypt');
const { findEmail, save, findUserById } = require('../repository/userRepository');



const userRegister = async ({ email, password }) => {
    try {
        const userExist = await findEmail(email)
        if (userExist) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            email, password: hashedPassword
        };
        const savedUser = await save(newUser);

        return { user: savedUser, message: "successfully saved" }

    } catch (error) {
        console.log("Error in userservice:", error.message);
        throw error;
    }
}
const logoutUser = async (res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
     secure: true, // match with how you set the cookie during login
    });
  } catch (err) {
    throw new Error("Logout failed");
  }
};
const userLogin = async ({ email, password }) => {
    try {
        const userExist = await findEmail(email);
        if (!userExist) {
            throw new Error('User not exists');
        }
        const passwordMatch = await bcrypt.compare(password, userExist.password)
        if (!passwordMatch) {
            return res.status(404).json({
                message: "user login failed"
            })

        }
        return { user: userExist, message: "Login successful" };
    } catch (error) {
        console.log("Error in userservice login:", error.message);
        throw error;
    }
}
const getUserProfile = async (id) => {
    const userData = await findUserById(id); // directly use findUserById
    if (!userData) {
        const error = new Error('User does not exist');
        error.status = 400;
        throw error;
    }
    return userData;
};


module.exports = { userRegister, userLogin ,logoutUser,getUserProfile}