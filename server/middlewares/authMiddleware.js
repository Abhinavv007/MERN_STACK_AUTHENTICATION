import jwt from "jsonwebtoken"
const secretKey = 'secret';

const verifyToken = (req,resp,next)=>{
    const authHeader = req.headers['authorization']
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.slice(7)
        jwt.verify(token,secretKey,(err,decoded)=>{
            if (err) {
                return resp.status.json({ msg: 'Invalid token' });
              }
              req.user = decoded;
               next();
        })
    } else{
        resp.json({msg:"Authentication Required"})
    }

}
export default verifyToken