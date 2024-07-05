import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { customConsole } from "../../util/constent/Constent.js";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, "Mobile is required"],
        trim: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
}, { timestamps: true });





UserSchema.pre("save", async function (next) {
    customConsole("Before Save", this.password);
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    customConsole("After Save", this.password);
    next();
});




const UserModel = mongoose.model("User", UserSchema);
export default UserModel