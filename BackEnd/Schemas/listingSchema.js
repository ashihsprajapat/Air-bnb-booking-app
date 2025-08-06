import { Schema } from "mongoose";
//const Review
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

const listingSchema = new Schema({
    onwer: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    title: { type: String, required: true, },
    date: { type: Date, default: Date.now(), },
    location: { type: String, required: true, },
    address: {
        country: { type: String, },
        float: { type: String },
        streetAddress: { type: String },
        NearByLandMark: { type: String },
        District: { type: String, },
        city: { type: String, },
        state: { type: String },
        pinConde: { type: String },
    },
    guestType: { type: String },
    category: { type: String },
    description: { type: String, required: true },
    isBook: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    currentBooking: [{
        type: Schema.Types.ObjectId,
        ref: "Booking",
    }],


    price: { type: Number, default: 29 },
    image: [{
        filename: String,
        url: {
            type: String,
            default: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIzNjE1MDExMTUxNzU5ODEyNw%3D%3D/original/19b0b33e-6a94-43c3-9ec7-48bfb79be8c8.jpeg?im_w=720&im_format=avif',
        }

    }],

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },

})
export default listingSchema;