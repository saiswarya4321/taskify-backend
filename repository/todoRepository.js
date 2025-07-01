const todo = require("../models/todoModel");

const saveTodo= async(todos)=>{
    try {
       const newTodo= new todo(todos) 
       return await newTodo.save();
    } catch (error) {
       console.log("Error in repository:", error.message); 
    }
}
const getTodoByUserId=async(userId)=>{
    return await todo.find({user:userId})
}


const updateTodoById = async (id, updateData) => {
    try {
        return await todo.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.log("Error in repository:", error.message);
        throw error;
    }
};

const deleteTodoById = async (id, user) => {
    try {
        // Optional: ensure only the owner can delete
        return await todo.findOneAndDelete({ _id: id, user });
    } catch (error) {
        console.log("Error in repository:", error.message);
        throw error;
    }
};

const getTodoByUserAndId = async ({ id, user }) => {
    return await todo.findOne({ _id: id, user});
};

module.exports={
    saveTodo,getTodoByUserId,updateTodoById,deleteTodoById,getTodoByUserAndId
}