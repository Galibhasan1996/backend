import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    status: {
        type: String,
        trim: true,
        enum: ["pending", "complete"],
        default: "pending"
    },
    category: {
        type: String,
        trim: true
    },
    dueDate: {
        type: String
    }
}, { timestamps: true })



const TodoModel = mongoose.model("Todo", TodoSchema)
export default TodoModel
