import mongoose from "mongoose";

const user_Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    }
}, { timestamp: true });


const User = mongoose.model('user', user_Schema);

export default User