import connectDB from "./DB/index.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})
connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log("server running successfully")

    })
})
.catch((error) => {
    console.log("Database connected successfully" , error)
})




