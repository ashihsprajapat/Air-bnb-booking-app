
import bcrypt from 'bcrypt'

import User from './userModel.js';
import { generateToekn } from './../utils/tokenGenret.js';
import nodemailer from 'nodemailer'

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
export const saveOTP= async(req, res)=>{
    try {
        const {user}= req.user;
          const transport = nodemailer.createTransport({
            host: "AshishPrajpat",
            port: 1029,
            secure: true,
            auth: {
                user: "ashishprajapat507@gmail.com",
                pass: "Ashish@123"
            }
        })

        const otpGen = Math.floor(Math.random() * 1000000)
        const info = await transport.sendMail({
            from: "ashishprajapat507@gmail.com",
            to: userData.email,
            subject: "Verify Email ",
            html: `<b>Hello world ${otpGen}</b>`,
        })
        console.log(info)
        console.log("sending email successfull")
    
       
        user.otp= otpGen;
        user.validTime= Date.now + 10 * 60 * 1000;
        await user.save()
        return res.json({success:true, message:"opt save"})
    } catch (error) {
        res.json({message:error.message, success:false})
    }
}

//verify user email
export const verifyEmail= async(req,res)=>{
    try{
        const {otp, validTime}= req.body;
        const {user} =req
        if(!user.otp  || !user.validTime)
            return res.json({success:false, message:"Please send otp"})
        if(!otp.equlas(user.otp) )
            return res.json({success:false, message:"wrong otp "})
        if( user.validTime < Date.now())
            return res.json({success:false, message:"Not valid OTP please try Again"})
        user.verifyEmail=true;
        user.otp=null;
        user.validTime=null;
        await user.save()
        return res.json({message:"Verify successfull", success:true})

    }catch(err){
        console.log(err)
        res.json({message:err.message, success:false})
    }
}