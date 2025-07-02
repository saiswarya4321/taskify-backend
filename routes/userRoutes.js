
const express=require("express");
const { register, login, logout, userProfile, checkLogin } = require("../controllers/userController");
const { authUser } = require("../middleware/userAuth");
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", logout);
router.get("/profile",authUser, userProfile);
router.get("/islogin",authUser,checkLogin)

module.exports={userRouter:router}