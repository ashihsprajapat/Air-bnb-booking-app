
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
    onwer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
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
    transaction:{type:Schema.Types.ObjectId, ref:"Transaction", required:true}

})


export default bookingSchema
