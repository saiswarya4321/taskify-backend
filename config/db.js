const { default: mongoose } = require("mongoose")


const connectionDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://aiswaryas4906:mPx7Ysu6yew45gsp@cluster0.waa9ijc.mongodb.net/tododb");
        console.log("todo database connected successfully!")

    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectionDb }