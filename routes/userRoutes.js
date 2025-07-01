
const express=require("express");
const { register, login, logout, userProfile } = require("../controllers/userController");
const { authUser } = require("../middleware/userAuth");
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", logout);
router.get("/profile",authUser, userProfile);


module.exports={userRouter:router}