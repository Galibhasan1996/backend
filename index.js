import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import { currentIPAddress, currentTime } from "./util/constent/Constent.js";
import { connectDB } from "./db.js";

import Auth from "./route/Auth/AuthRoute.js"

const app = express();
dotenv.config();

connectDB()

const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", Auth)

app.get("/", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Welcome to Todo App",
    });

});



app.listen(PORT, () => {
    console.log(`Server is running on ( PORT ${chalk.red(PORT)} IP ${chalk.red(currentIPAddress())}  Time ${chalk.red(currentTime)} )`);
});