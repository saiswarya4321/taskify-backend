const { default: mongoose } = require("mongoose");


const todoSchema=  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    date:{
       type: Date,
        default: Date.now
    },
    eventDate:{
        type:String,
       
    },
    user: { // Reference to the user who created the todo
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})
const todo=mongoose.model("todos",todoSchema);
module.exports=todo