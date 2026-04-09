

import express from 'express';
import { getUserData, otpsend,  userLogin, userRegister, verifyEmail } from './user.controll.js';
import { protectListing } from '../middleware/protectListing.js';
const Router = express.Router()


//register 
Router.route("/register")
    .post(userRegister)


//user login
Router.route("/login")
    .post(userLogin);

Router.route("/getData")
    .get(protectListing, getUserData)

Router.post("/sendOTP", protectListing, otpsend)
Router.post("/verifyOtp", protectListing, verifyEmail)


export default Router;