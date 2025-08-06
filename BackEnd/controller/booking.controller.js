

import { Booking } from "../models/bookingModel.js";
import Listing from "../models/listingModel.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createBooking = async (req, res) => {
    try {
        const user = req.user;
        const { listingId } = req.params;

        const {
            guestCount,
            totalPrice,
            paymentStatus,
            from,
            to
        } = req.body;

        // Find listing first to use in stripe session
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        // Validate required fields
        if (!totalPrice || !from || !to || !guestCount || !paymentStatus) {
            return res.status(400).json({
                success: false,
                message: "Missing required booking details"
            });
        }

        if (listing.isBooked) {
            return res.status(400).json({
                success: false,
                message: "This listing is already booked"
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: listing.title,
                        },
                        unit_amount: totalPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        // Create new booking
        const newBooking = new Booking({
            guest: user._id,
            ownerName: user.name,
            totalPrice,
            paymentStatus,
            listingId: listing._id,
            userId: user._id,
            bookingDuration: {
                from,
                to,
                guestCount
            }
        });

        await newBooking.save();

        // Update listing status
        listing.isBooked = user._id;
        listing.currentBooking = newBooking._id;
        await listing.save();

        return res.status(200).json({
            success: true,
            id: session.id,
            booking: newBooking
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