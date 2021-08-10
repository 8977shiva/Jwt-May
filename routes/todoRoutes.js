import express from "express";
// import Todo from "../model/ToboSchema.js"
import auth from "../verfiyToken.js";

const todorouters = express.Router();


todorouters.get("/", auth, (req, res) => {
        res.send("Todo list ")
    }
)

export default todorouters;