

import express from 'express';
import { getUserData, userLogin, userRegister } from '../controller/user.controll.js';
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


export default Router;