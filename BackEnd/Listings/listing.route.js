

import express from 'express';
const Router = express.Router();
import upload from '../config/multer.js';
import { createListing, deleteListing, getAllListingHostByUser, getAllListings, getListingById, getUpdateListingDetails, updateListing } from './listing.controller.js';
import { protectListing } from '../middleware/protectListing.js';



//get all listing
Router.route("/")  // caching
    .get(getAllListings);

//update listing by id
Router.route("/:id/update-listing")   // caching 
    .get(protectListing, getUpdateListingDetails)
    .post(protectListing, upload.single("image"), updateListing)



//delete listing
Router.route("/:id/delete")
    .delete( protectListing,  deleteListing)


//get a single listing
Router.route("/:id")
    .get(getListingById)

//create Listing
Router.route("/create") // caching
    .post(
        protectListing,
        upload.array("image",8),
        createListing
    );


//get all listing host by user
Router.route("/profile/all-listing")
.get(protectListing,
    getAllListingHostByUser   // caching 
)




export default Router
