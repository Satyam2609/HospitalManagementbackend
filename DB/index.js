import mongoose from "mongoose";

const connectDB = async() => {
   try {
     const connectInstance = await mongoose.connect(process.env.MONGODB_URL)
     if(connectInstance){
        console.log(`MONGODB CONNECTED SUCCESSFULLY ${connectInstance.connection.host}`)
     }
   } catch (error) {
    console.log("mongodb is not connected")
    process.exit(1)
    
   }
}
export default connectDB