
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../User/userModel.js';
dotenv.config();
import client from './../config/Redis.js';

export const protectListing = async (req, res, next) => {


    
    const token = req.headers.token;
    
    if (!token) {
        return res.json({ success: false, message: "User not register" })
    }
    try {
        const cachedUser = await client.get(token)
        
        if(cachedUser ){
            req.user= JSON.parse(cachedUser)
            return next();
        }
        const decode = jwt.verify(token, process.env.JwT_SECRET)
        
        const user = await User.findById(decode.id).select('-password')
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        req.user= user;
        await client.set(token, JSON.stringify(user),{EX: 20*60})

        next();
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message });
    }


}

export const verifyEmail=async(req,res,next)=>{
    try {
        const user= req.user;
        if(!user.verify){
            return res.json({message:"Please verify Email", success:false})
        }
        console.log("return befor here")
        next();
    } catch (error) {   
        
    }
}

