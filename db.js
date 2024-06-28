import chalk from "chalk";
import mongoose from "mongoose";
import { currentIPAddress, currentTime, customConsole } from "./util/constent/Constent.js";

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
            .then(() => {
                console.log(`DB Connected (  IP ${chalk.red(currentIPAddress())}  Time ${chalk.red(currentTime)} )`);
            })
            .catch((err) => {
                customConsole("🚀 ~ file: db.js:12 ~ connectDB ~ err:", err)
            })

    } catch (error) {
        customConsole("🚀 ~ file: db.js:16 ~ connectDB ~ error:", error)
    }
}