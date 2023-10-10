import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js"
import bcrypt from "bcrypt"
class authController{
    static userRegistration = async(req,resp)=>{
      const {name,email,password} = req.body
      try {
        if(name && email && password){
            const check = await authModel.findOne({email})
            if(!check){
              const hashedPassword =  await bcrypt.hash(password,10)
                const newUser = new authModel({name,email,password:hashedPassword})
                const result=await newUser.save()
                resp.json({msg:"Registration done successfully"})
            } else{
                resp.json({msg:"User already Exists with this email"})
            }
          } else{
            resp.json({msg:"All fields are required"})
          }
      } catch (error) {
        resp.json(error.message)
      }
    }

static userLogin = async(req,resp)=>{
  const {email,password} = req.body
  try {
    if(email && password){
    const check = await authModel.findOne({email})
  if(check){
    if(check.email===email && await bcrypt.compare(password,check.password)){
      const token = jwt.sign({userID:check._id},"secret",{expiresIn:"1d"})
      resp.json({msg:"Login Successfully",token,name:check.name,id:check._id})
    } else{
      resp.json({msg:"Invalid User"})
    }
  } else{
    resp.json({msg:"Email doesn't exists"})
  }
} else{
  resp.json({msg:"All fields are required"})
}
  } catch (error) {
    resp.json(error.message)
  }

}

static changePassword = async(req,resp)=>{
const{newPassword,confirmPassword} = req.body
const {id} = req.params

try {
  
  if(newPassword && confirmPassword){
   if(newPassword===confirmPassword){
    const hashedPassword = await bcrypt.hash(newPassword,10)
    await authModel.findByIdAndUpdate(id,{
      password:hashedPassword
    })
    resp.json({msg:"Password Changed Successfully"})
   } else{
    resp.json({msg:"Password doesn't match"})
   }
  } else{
    resp.json({msg:"All fields are required"})
  }
  
} catch (error) {
  resp.json({msg:"error occured"})
}
}
}

export default authController