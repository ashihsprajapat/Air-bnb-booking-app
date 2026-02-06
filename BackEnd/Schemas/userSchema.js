import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, },
    clerkId:{type : String, required:true},
    profileImage:{type:String},
    firstName:{type:String},
    LastName:{type:String},
    totalPublicListings:[ { type: Schema.Types.ObjectId, ref: 'Listing' }],
    totalBookings:[ { type: Schema.Types.ObjectId, ref: 'Booking' }],
});
export default userSchema;