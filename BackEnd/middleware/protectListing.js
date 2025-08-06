
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from './../models/userModel.js';
dotenv.config();

export const protectListing = async (req, res, next) => {

    
    const token = req.headers.token;
    
    if (!token) {
        return res.json({ success: false, message: "User not register" })
    }
    try {
        const decode = jwt.verify(token, process.env.JwT_SECRET)

        req.user = await User.findById(decode.id).select('-password')

        next();
    } catch (err) {
        res.json({ success: false, message: err.message });
    }


}


