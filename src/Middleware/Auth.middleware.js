import jwt from "jsonwebtoken";
import { employee } from "../Models/Employee.model.js";
import { User } from "../Models/User.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accesstoken || req.headers?.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ error: "Please authenticate." });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const user = await User.findById(decoded._id) || await employee.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Please authenticate."});
  }
};