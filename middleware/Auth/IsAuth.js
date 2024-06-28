import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../../model/AuthMedel/Auth.js';
import { customConsole } from '../../util/constent/Constent.js';

dotenv.config()

export const isAuth = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Aunauthorized user || you do not have tokens"
        })
    }
    const VarifyToken = jwt.verify(token, process.env.SECRET)
    const user = req.user = await UserModel.findById(VarifyToken._id)
    customConsole("🚀 ~ file: IsAuth.js:18 ~ isAuth ~ user:", user)
    next()
}