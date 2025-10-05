

import { Booking } from "../models/bookingModel.js";
import Listing from "../models/listingModel.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createBooking = async (req, res) => {
    try {
        const bookingData = req.bookingData;
        const user = req.user;
        const listingId = req.bookingData?.listingId.toString();


        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }


        if (listing.isBooked) {
            return res.status(400).json({
                success: false,
                message: "This listing is already booked"
            });
        }


        // Create new booking
        const newBooking = new Booking({
            guest: user._id,
            ownerName: user.name,
            totalPrice: bookingData.totalAmount,
            paymentStatus: bookingData.payment === true ? 'confirmed' : 'cancelled',
            listing: listing._id,
            transaction: bookingData._id,
            bookingDuration: {
                from: bookingData.bookingDuration.from,
                to: bookingData.bookingDuration.to,
                guestCount: bookingData.guests
            }
        });

        await newBooking.save();

        // Update listing status
        listing.isBook = user._id;
        listing.currentBooking.push( newBooking._id);
        await listing.save();
        // adding into user totalBookings array
        user.totalBookings.push(newBooking._id);
        await user.save();

        return res.status(200).json({
            success: true,
            booking: newBooking,
            message: "Booking conformed"
        });

    } catch (err) {
        console.error("Booking creation error:", err);
        return res.status(500).json({
            success: false,
            message: "Error creating booking",
            error: err.message
        });
    }
}

export const cancelBooking = async (req, res) => {
    try {

        const user = req.user;
        const { listingId, bookingId } = req.params;

        const { paymentStatus } = req.body;

        let listing = await Listing.findById(listingId);
        let booking = await Booking.findById(bookingId)
        if (!listing || !booking) {
            return res.json({ success: false, message: "Air bnb is not found" })
        }

        if (paymentStatus === 'cancelled') {

            listing.isBook = null;
            listing.currentBooking = null

            await listing.save();

            await Booking.findByIdAndDelete(bookingId)

            return res.json({ success: false, message: "Booking cancell" })

        } else if (paymentStatus === 'confirmed') {
            booking.paymentStatus = 'confirmed'
            await booking.save()

            return res.json({ success: false, message: "Booking confirmation successfully" })
        }


    } catch (err) {
        res.json({ success: false, message: err.message })

    }
}

export const getAllBookingByUser= async(req, res)=>{
    try {
        const {user}= req
        const bookings= await Booking.find({guest: user._id}).populate("listing")

        res.json({success:true, message:"All bookings", bookings})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}