
import dotenv from "dotenv"
//if (process.env.NODE_ENV != "production") {
dotenv.config();
//}



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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
  .catch(err => console.log(err));

app.get("/", (req, res) => { res.json({ working: "good" }) })


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

