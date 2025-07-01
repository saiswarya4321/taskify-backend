const express=require("express");
const { add, list, update, remove, getTodoById } = require("../controllers/todoController");
const { authUser } = require("../middleware/userAuth");
const router=express.Router();

router.post("/add",authUser,add)
router.get("/list",authUser,list)
router.put("/update/:id",authUser,update)
router.delete("/delete/:id",authUser,remove)
router.get("/listone/:id",authUser,getTodoById)

module.exports={todoRouter:router}