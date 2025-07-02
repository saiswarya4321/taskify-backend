
const express=require("express")
require("dotenv").config()
const cookie=require("cookie-parser");
const { connectionDb } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { todoRouter } = require("./routes/todoRoutes");
const cors = require('cors');
const bodyParser = require('body-parser');


const app=express();
app.use(cookie());

app.use(cors({
    origin: ['https://taskify-frontend-theta.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
}));

app.use(express.json());



app.get("/",(req,res)=>{
res.send("Todo application")
})
connectionDb();


app.use("/user",userRouter);
app.use("/todo",todoRouter)

app.use((req, res, next) => {
  console.log("BODY RECEIVED:", req.body);
  next();
});

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})