

import express from 'express'
import { protectListing } from '../middleware/protectListing.js';
import { paymnetRazorPay, verifyRazorpay } from '../controller/transaction.controller.js';
import { createBooking } from '../controller/booking.controller.js';

const transactionRoute= express.Router();


//api to make payment  for credits
transactionRoute.post("/payment/:id", protectListing, paymnetRazorPay)

transactionRoute.post("/verify", protectListing, verifyRazorpay,  createBooking)


export default transactionRoute;