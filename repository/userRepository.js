
const userDb=require("../models/userModel");

const findEmail = async (email) => {
    try {
        return await userDb.findOne({ email });
    } catch (error) {
        console.log(error);
        throw new Error("Database error while finding email");
    }
}

const save = async (user) => {
    try {
        const newUser = new userDb(user);
        return await newUser.save();
    } catch (error) {
        console.log(error);
        throw new Error("Database error while saving user");
    }
}



const findUserById = async (id) => {
    try {
        return await userDb.findOne({ _id:id }).select('-password');
    } catch (error) {
        console.log(error);
    }
};


module.exports={findEmail,save,findUserById}