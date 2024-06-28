import validator from "validator"
import { customConsole } from "../../util/constent/Constent.js"
import UserModel from "../../model/AuthMedel/Auth.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

// ----------register controller------------
export const userRegisterController = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body

        if (!name) {
            return res.status(400).json({
                status: false,
                error: "Name is required"
            })
        }

        if (!email) {
            return res.status(400).json({
                status: false,
                error: "Email is required"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: false,
                error: "Invalid email format"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: false,
                error: "Password is required"
            })
        }


        if (!mobile) {
            return res.status(400).json({
                status: false,
                error: "Mobile is required"
            })
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                status: false,
                error: "Email already exists"
            })
        }

        const newUser = await UserModel.create({ name, email, password, mobile })

        return res.status(200).json({
            status: true,
            message: "User registered successfully",
            newUser,
        })

    } catch (error) {
        customConsole("🚀 ~ file: RegisterController.js:63 ~ userRegisterController ~ error:", error.message)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        });
    }
}


// ----------login controller------------

export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                status: false,
                error: "Email is required"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: false,
                error: "Invalid email format"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: false,
                error: "Password is required"
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: false,
                error: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                status: false,
                error: "password is incorrect"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "10 days" })


        return res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false,
            secure: process.env.NODE_ENV === "development" ? true : false,
        }).json({
            status: true,
            message: "Login successfully",
            user,
            token
        })



    } catch (error) {
        customConsole("🚀 ~ file: RegisterController.js:124 ~ userLoginController ~ error:", error.message)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        });
    }
}

// ---------  all user controller-----------

export const getAllUserController = async (req, res) => {
    try {
        const allUser = await UserModel.find({})

        if (!allUser) {
            return res.status(400).json({
                status: false,
                error: "No user found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "All user data",
            count: allUser.length,
            allUser
        })

    } catch (error) {
        customConsole("🚀 ~ file: RegisterController.js:152 ~ getAllUserController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        });
    }
}