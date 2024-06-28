import express from "express"
import { getAllUserController, userLoginController, userRegisterController } from "../../controller/RegisterController/RegisterController.js"
import { isAuth } from "../../middleware/Auth/IsAuth.js"

const router = express.Router()


// -------------auth router----------------

router.post("/register", userRegisterController)

// ----------- login-------------

router.post("/login", userLoginController)

// --------all user data-----------
router.get("/all-user", isAuth, getAllUserController)

export default router