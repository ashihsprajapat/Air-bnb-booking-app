
import dotenv from "dotenv"
//if (process.env.NODE_ENV != "production") {
dotenv.config();
//}
import { clerkMiddleware } from '@clerk/express'
import {  clerkClient, requireAuth, getAuth } from '@clerk/express'



import express from "express";
import mongoose from "mongoose";
import connectToCloudinary from "./config/cloundinary.js";
import cors from 'cors'

//route for review
import revieRoute from './routes/review.rout.js'

//route for user authentication
import userRoute from './routes/User.routes.js'

//routes for listing
import ListingRoute from "./routes/listing.route.js";

const app = express();


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));



const allowedOrigins = ['http://localhost:5173', 'https://air-bnb-booking-app-psi.vercel.app']; // Add production domain here

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow credentials (cookies) to be sent
}));
const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log("app is listening on port", port);
})

import connectToDataBase from "./config/mongooseDB.js";
import bookingRout from "./routes/booking.rout.js";
import transactionRoute from "./routes/transacation.rout.js";

//connect to database 
await connectToDataBase()
  .then(() => {
    console.log("connect to data base");
  })
  .catch(err => console.log("error create at connecting to mongose atlash ",err));

app.get("/", (req, res) => { res.send( "Api is working fine" ) })


//connect to cloudinary
await connectToCloudinary();


//routes for listing
app.use("/listing", ListingRoute);

//router for revie
app.use("/revies", revieRoute)


//route for user login and register
app.use("/auth", userRoute)



app.use("/booking", bookingRout)

app.use("/transaction", transactionRoute)

