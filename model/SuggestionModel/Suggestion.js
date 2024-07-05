import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });



const suggestionModel = mongoose.model("Suggestion", suggestionSchema);
export default suggestionModel
