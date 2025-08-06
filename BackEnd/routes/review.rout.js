
import express from 'express';
import { createReview, deleteRevie } from '../controller/Review.controller.js';
import { protectListing } from './../middleware/protectListing.js';
const Router = express.Router();


//create revie
Router.route("/create-review/:id")
.post( protectListing, createReview)

Router.route("/:Lid/:Rid/delete")
.post( protectListing, deleteRevie)



export default Router;