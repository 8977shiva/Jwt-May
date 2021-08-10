import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


import router from "./routes/routes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config()
const app = express();
// json middleware
app.use(express.json());


//DB Connect
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("connected to DB"));


// sever listen
app.use("/ui/users", router)
app.use("/user/todo", todoRoutes)
app.listen(3000, () => console.log('sever running at http://localhost:3000/'))






