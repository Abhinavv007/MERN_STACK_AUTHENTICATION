import mongoose from "mongoose"
const connectDB = async()=>{
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/Auth")
    if(connect){
        console.log("Database Connected")
    }
    else{
        console.log("Some error occured in connection with db")
    }
}
export default connectDB