import mongoose from "mongoose";
const authSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const authModel = mongoose.model("users",authSchema)
export default authModel