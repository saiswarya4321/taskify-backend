const { findByIdAndUpdate } = require("../models/todoModel");
const { addTodo, findTodo, updateTodo, deleteTodo, findTodoById } = require("../services/todoServices");

const add = async (req, res) => {
    try {
        const { name, description, eventDate } = req.body;
        if (!name ) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const userId = req.user.id;
        const message = await addTodo({ name, description, eventDate, user: userId });
       
        res.status(201).json({ message: "Todo added successfully", todo: message });
    } catch (error) {
        console.log(" error adding todo")
        return res.status(400).json({ message: error.message })
    }
}
const list=async(req,res)=>{
    try {
        const userId=req.user.id;
        
        const todos=await findTodo(userId);
         res.status(200).json(todos);
    } catch (error) {
        console.log(" error listing todos")
        return res.status(400).json({ message: error.message })
    }
}



const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, eventDate } = req.body;

        if (!name) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = req.user.id;

        const updatedTodo = await updateTodo({ id, name, description, eventDate, user: userId });

        if (!updatedTodo) {
            return res.status(400).json({ message: "Todo not updated" });
        }

        return res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.log("Error updating todo:", error.message);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }

        const userId = req.user.id;

        const deletedTodo = await deleteTodo({ id, user: userId });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found or not deleted" });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });
        console.log("todo deleted successfully")
    } catch (error) {
        console.log("Error deleting todo:", error.message);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }

        const userId = req.user.id;

        const todo = await findTodoById({ id, user: userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Todo fetched successfully", todo });
    } catch (error) {
        console.log("Error fetching todo:", error.message);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};


module.exports = { add ,list,update,remove,getTodoById}