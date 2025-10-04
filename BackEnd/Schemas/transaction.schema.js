
import mongoose, { model, Schema } from "mongoose";

export const transactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    guests: { type: Number, required: true },
    nights: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
    bookingDuration: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },

    },
})

