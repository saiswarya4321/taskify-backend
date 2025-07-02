const { default: mongoose } = require("mongoose")


const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("todo database connected successfully!")

    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectionDb }