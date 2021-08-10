import mongoose from "mongoose";


const todoSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    tag: String,
});

const todo = mongoose.model('todo', todoSchema);
export  default  todo