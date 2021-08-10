import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
});

const users = mongoose.model('Users', PostSchema);
export  default  users