
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';

export const generateToekn = (id) => {

    return jwt.sign({ id }, process.env.JwT_SECRET, { expiresIn: '15d' });
    // console.log("Token is", to)
    //  token;
}