import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";

import { Schema } from "mongoose";

const reviewsSchema = new Schema({
    onwer: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ownerName:{
        type:String, required:true,
    },
    rating: {
        type: Number, max: 5, min: 0, default: 1,
    },
    comment: { type: String, required: true, }

},{ timestamps:true})
export default reviewsSchema