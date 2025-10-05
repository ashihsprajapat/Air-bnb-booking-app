import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, },
    name: { type: String, required: true },
    password: { type: String, required: true },
    totalPublicListings:[ { type: Schema.Types.ObjectId, ref: 'Listing', }],
    totalBookings: { type: Number, default: 0 },
});
export default userSchema;