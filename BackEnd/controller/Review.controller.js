
import Review from '../models/reviewModel.js';
import Listing from './../models/listingModel.js';

//create a review for a listing
export const createReview = async (req, res) => {


    const { rating, comment } = req.body;
    const user = req.user;


    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing)
            return res.json({ success: false });

        const newReview = new Review({
            rating, comment, onwer: user._id,
            ownerName: user.name
        })
        await newReview.save();
        listing.reviews = [...listing.reviews, newReview._id];
        await listing.save();
        res.json({ success: true, message: "review is create" })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


//delte a revie for a listing
export const deleteRevie = async (req, res) => {
   // console.log("delete review function invoke")
    const { Lid, Rid } = req.params;

    try {
        const listing = await Listing.findById(Lid);

        const review = await Review.findById(Rid);

        if (!listing || !review) {
            res.json({ success: false, message: "listing and review not exist" })
        }
        listing.reviews=listing.reviews.filter((rev) => (rev != Rid));
        await listing.save();

        

        await Review.findByIdAndDelete(Rid);

        res.json({ success: true, message: "review is deleted" })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}