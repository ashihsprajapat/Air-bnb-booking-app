
import bcrypt from 'bcrypt'

import User from './userModel.js';
import { generateToekn } from './../utils/tokenGenret.js';

import { optGernate } from './../utils/optGererate.js';
import { transport , templetOTPMail } from '../config/NodeMailer.js';
import client from '../config/Redis.js';


//user register
export const userRegister = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password )
        return res.json({ success: false, message: "missing details" })
    try {
        const user = await User.findOne({ email })
        if (user)
            return res.json({ success: false, message: "email is already exist" })
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashpassword, lastLogin: Date.now()
        })

        await newUser.save();
        
        res.json({ success: true, message: "user register successfull", token: generateToekn(newUser._id) })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }



}


//login
export const userLogin = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password)
        return res.json({ success: false, message: "missing details" })


    try {
        const user = await User.findOne({ email })
        if (!user)
            return res.json({ success: false, message: "email not exist" })

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.json({ success: false, message: "wrong password" })
        user.lastLogin= Date.now()
        await user.save();
        res.json({
            success: true,
            message: "Login success full",
            token: generateToekn(user._id),
        })
    } catch (err) {
        res.json({ success: false, message: err.message });
    }

}


//get user data

export const getUserData= async(req,res, next)=>{
    const user= req.user;

    res.json({success:true, user});
}

//sending email 
export const otpsend= async(req, res)=>{
    try {
        const user= req.user;
        const otp = optGernate()

        const content= templetOTPMail(user.email, otp)
        
        const info = await transport.sendMail(content)
        if(info.rejected.length  > 0)
            return res.json({message:"Something went wrong", success:false})
        
        res.json({success:true, message:"opt save Success full "})
        
        let val= await  client.set(`otp:${user._id}`, otp, {EX : 1*60} )
        
    } catch (error) {
        res.json({message:error.message, success:false})
    }
}

//verify user email
export const verifyEmail= async(req,res)=>{
    try{
        const {otp}= req.body;
        const user =await User.findById(req.user)
        if(!otp  )
            return res.json({success:false, message:"Please give me otp"})
        let val= await client.get(`otp:${user._id}`)
        if(!val)
            return res.json({message:"Otp is expire", success: false})
        
        if(JSON.parse(val) != otp)
            return res.json({message:"Wrong Otp", success:false})
        
        user.verify = true;
        res.json({success:true, message:"Email verify success", user})
        await user.save();
        const token = req.headers.token;
        await client.set(token, JSON.stringify(user),{EX:20*60}) // 20 minit
    }catch(err){
        console.log(err)
        res.json({message:err.message, success:false})
    }
}