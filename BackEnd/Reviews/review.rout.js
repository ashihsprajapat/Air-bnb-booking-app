
import express from 'express';
import { createReview, deleteRevie } from './Review.controller.js';
import { protectListing, verifyEmail } from '../middleware/protectListing.js';
const Router = express.Router();


//create revie
Router.route("/create-review/:id")
.post( protectListing, verifyEmail, createReview)

Router.route("/:Lid/:Rid/delete")
.post( protectListing, verifyEmail, deleteRevie)



export default Router;