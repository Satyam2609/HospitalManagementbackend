import {Router} from "express"
import { onlyReception} from "../Middleware/Authentication.middleware.js"
import { userAuth } from "../Middleware/useAuth.middelware.js"
import { verifyUser } from "../Middleware/Auth.middleware.js"

const permission = Router()

permission.route("/formworker").get(verifyUser, onlyReception)
permission.route("/auth").get(userAuth)

export default permission

