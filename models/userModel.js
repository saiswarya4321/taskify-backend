const { default: mongoose, model } = require("mongoose");

const userSchema=new mongoose.Schema({
    
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
        }
    
})
const user=mongoose.model("user",userSchema)
module.exports=user;