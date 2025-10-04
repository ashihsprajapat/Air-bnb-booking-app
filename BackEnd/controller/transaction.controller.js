import Transaction from "../models/transaction.model.js";
import Razorpay from "razorpay";
import User from './../models/userModel.js';

//getway initailize
const razorpayInstance = new Razorpay({
    key_id: process.env.ROZORPAY_ID,
    key_secret: process.env.ROZORPAY_SECRET,
});

//api to make payment  for credits
export const paymnetRazorPay = async (req, res) => {
    try {
        const { _id } = req.user;
        const { id: listingId } = req.params;
        const { totalAmount, bookingDuration, guests, nights, pricePerNight } = req.body;

        const userData = await User.findById(_id.toString());
        if (!userData || !totalAmount || !guests || !bookingDuration)
            return res.json({ success: false, message: "invalid credentials" });

        const transactionData = {
            userId: _id.toString(),
            listingId: listingId.toString(),
            guests,
            nights,
            pricePerNight,
            totalAmount,
            date: new Date(), // ✅ proper Date
            bookingDuration
        };


        const newTransaction = new Transaction(transactionData);

        const savedTransaction = await newTransaction.save(); // ✅

        const amount = totalAmount; // ✅ You used `amount` later but didn’t define it

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: savedTransaction._id.toString(),
        };


        await razorpayInstance.orders.create(options, (err, order) => {
            if (err) return res.json({ message: err, success: false });
            console.log("from here transaction is done")
            res.json({ success: true, order });
        });
    } catch (error) {
        console.error("Error in paymnetRazorPay:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//api controller finction to verify razorpay payment verifu
export const verifyRazorpay = async (req, res, next) => {
    try {
        const { razorpay_order_id } = req.body;

        if (!razorpay_order_id)
            return res.json({ success: false, message: "razorpay_order_id is requried" })

        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderinfo.status === 'paid') {
            const transactionData = await Transaction.findById(orderinfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment failed" })
            }




            await Transaction.findByIdAndUpdate(transactionData._id, { payment: true })
            req.bookingData = await Transaction.findById(transactionData._id);
            next();
        }
    } catch (error) {

    }
}
