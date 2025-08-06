
import { Schema } from "mongoose";

const bookingSchema = new Schema({
    guest: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ownerName: {
        type: String,
        required: true,
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
    },

    bookingDuration: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        guestCount: { type: Number, required: true },

    },
    totalPrice: {
        type: Number,
        required:true
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },

})


export default bookingSchema
