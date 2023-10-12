import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
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

static forgetPassword = async(req,resp)=>{
   const {email} = req.body
   try {
    if(email){
      
    const check = await authModel.findOne({email})
    if(check){
     
      const link = `http://localhost:3000/user/reset/${check._id}`
      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
         
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
       from: process.env.EMAIL,
       to:email,
       subject:"Password Reset Request",
       text:"Hello this is text section",
       html:`<!DOCTYPE html>
       <html>
       <head>
         <style>
           /* Add your inline CSS styles here */
           body {
             font-family: Arial, sans-serif;
           }
           .container {
             width: 100%;
             max-width: 600px;
             margin: 0 auto;
             padding: 20px;
           }
           .card {
             background-color: #f8f8f8;
             border-radius: 10px;
             padding: 20px;
           }
           .btn {
             background-color: #007BFF;
             color: #fff;
             text-decoration: none;
             padding: 10px 20px;
             border-radius: 5px;
             display: inline-block;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <div class="card">
             <h2>Reset Your Password</h2>
             <p>Click the button below to reset your password:</p>
             <a href="${link}" class="btn">Reset Password</a>
             
             <p>If you did not request a password reset, please ignore this email.</p>
           </div>
         </div>
       </body>
       </html>
       `

      }
      transporter.sendMail(mailOptions,(error)=>{
        if(error){
          resp.json({msg:"Error Occured"})
        } else{
        resp.json({msg:"Email Sent"})
        }
      })

    } else{
      resp.json({msg:"No Account is associated with this email"})
    }
  } else{
    resp.json({msg:"Please fill the email field"})
  }
   } catch (error) {
    resp.json({msg:error.message})
   }
}
static saveForgetPassword = async(req,resp)=>{
  const{newPassword,confirmPassword}=req.body
  const{id} = req.params
  try {
    
 if(newPassword&&confirmPassword&&id){
   if(newPassword===confirmPassword){
    const hashedPassword =await bcrypt.hash(newPassword,10)
       const user = await authModel.findByIdAndUpdate(id,{
        password:hashedPassword
       })
       if(user){
        resp.json({msg:"Password Changed Successfully"})

       }else{
        resp.json({msg:"Some error occured"})
       }
      
   }else{
    resp.json({msg:"Both password fields doesn't match"})
   }
 }else{
  resp.json({msg:"All fields are required"})
 }
 } catch (error) {
    resp.json({msg:error.message})
  }
}
}
export default authController
