
import bcrypt from 'bcrypt'

import User from './../models/userModel.js';
import { generateToekn } from './../utils/tokenGenret.js';

import { Webhook } from 'svix'

//user clerk webhooks setup
export const webhooks= async(req, res)=>{
    try{


    const webhook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);
console.log("Ok its working ")

        // Verify webhook signature
        const svixHeaders = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        }

        const payload = JSON.stringify(req.body);

         try {
            webhook.verify(payload, svixHeaders);
        } catch (err) {
            console.error('Webhook verification failed:', err);
            return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
        }

         const { type, data } = req.body;
          switch (type) {
            case 'user.created': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address,
                   
                    firstName: data.first_name || '',
                    LastName: data.last_name || '',
                    profileImage: data.image_url || '',
                }

                const user = new userModel(userData);
                await user.save();

                return res.status(200).json({ success: true });
            }
            case 'user.deleted': {
                await userModel.findOneAndDelete({ clerkId: data.id });
                return res.status(200).json({ success: true });
            }
            case 'user.updated': {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses?.[0]?.email_address,
                    firstName: data.first_name || '',
                    LastName: data.last_name || '',
                    profileImage: data.image_url || '',
                }

                await userModel.findOneAndUpdate(
                    { clerkId: data.id },
                    userData,
                    { new: true }
                );
                return res.status(200).json({ success: true });
            }
            default:
                return res.status(400).json({ success: false, message: 'Unsupported webhook type' });
        }


   
    }catch{
        
    }

}


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