
import bcrypt from 'bcrypt'

import User from './../models/userModel.js';
import { generateToekn } from './../utils/tokenGenret.js';

//user register
export const userRegister = async (req, res) => {

    const { name, email, password } = req.body;
   // console.log(req.body)

    if (!name || !email || !password)
        return res.json({ success: false, message: "missing details" })
    try {
        const user = await User.findOne({ email })
        if (user)
            return res.json({ success: false, message: "email is already exist" })

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashpassword
        })

        await newUser.save();
       // console.log( 'new user details',newUser)
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