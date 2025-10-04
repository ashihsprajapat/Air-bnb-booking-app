
import express from "express";
import { protectListing } from './../middleware/protectListing.js';
import { createBooking, cancelBooking, getAllBookingByUser } from "../controller/booking.controller.js";
const bookingRout= express.Router()


//bookingRout.post("/createBooking/:listingId", protectListing, createBooking)


bookingRout.delete("/cancellBooking/:bookingId/:listingId", protectListing, cancelBooking)

bookingRout.get("/user-bookings", protectListing, getAllBookingByUser)




export default bookingRout;