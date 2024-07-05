import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });



const filterModel = mongoose.model("Filter", filterSchema);
export default filterModel
