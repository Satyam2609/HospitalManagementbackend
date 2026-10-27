import {Router} from "express"
import { loginUser, register } from "../Controller/User.controller.js"
import { upload } from "../Middleware/Multer.middleware.js"

const authRouter = Router()

authRouter.route("/create-register").post( upload.single("avatar") ,register)
authRouter.route("/login").post(loginUser)

export default authRouter