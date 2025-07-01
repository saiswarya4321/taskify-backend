const { saveTodo, getTodoByUserId, updateTodoById, deleteTodoById, getTodoByUserAndId } = require("../repository/todoRepository");


const addTodo = async ({ name, description, eventDate, user }) => {
   try {
      const newTodo = {
         name, description, eventDate, user
      };
      await saveTodo(newTodo)
   } catch (error) {
      console.log(error);
      console.log("Error in userservice:", error.message);
   }

}

const findTodo=async(userId)=>{
   return await getTodoByUserId(userId)
}


const updateTodo = async ({ id, name, description, eventDate, user }) => {
    if (!id) {
        throw new Error("Id not found");
    }

    const updatedTodo = await updateTodoById(id, { name, description, eventDate, user });

    if (!updatedTodo) {
        throw new Error("Todo not updated");
    }

    return updatedTodo;
};

const deleteTodo = async ({ id, user }) => {
    if (!id) {
        throw new Error("Todo ID is required");
    }

    const deletedTodo = await deleteTodoById(id, user);

    if (!deletedTodo) {
        throw new Error("Todo not found or not deleted");
    }

    return deletedTodo;
};



const findTodoById = async ({ id, user }) => {
    return await getTodoByUserAndId({ id, user });
};

module.exports = { addTodo,findTodo,updateTodo,deleteTodo ,findTodoById}