

import express from 'express';
const Router = express.Router();
import multer from 'multer';
import upload from './../config/multer.js';
import { createListing, deleteListing, getAllListingHostByUser, getAllListings, getListingById, getUpdateListingDetails, updateListing } from './../controller/listing.controller.js';
import { protectListing } from '../middleware/protectListing.js';



//get all listing
Router.route("/")
    .get(getAllListings);

//update listing by id
Router.route("/:id/update-listing")
    .get(protectListing, getUpdateListingDetails)
    .post(protectListing, upload.single("image"), updateListing)



//delete listing
Router.route("/:id/delete")
    .delete(deleteListing)


//get a single listing
Router.route("/:id")
    .get(getListingById)

//create Listing
Router.route("/create")
    .post(
        protectListing,
        upload.array("image",8),
        createListing
    );


//get all listing host by user
Router.route("/profile/all-listing")
.get(protectListing,
    getAllListingHostByUser
)




export default Router
