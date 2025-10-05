import cloudinary from 'cloudinary';
import Listing from './../models/listingModel.js';
//get all listings
export const getAllListings = async (req, res) => {
    try {
        const Listings = await Listing.find({}).populate('_id').select('-password')

        res.json({ success: true, Listings });

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}

//get a single listing by id
export const getListingById = async (req, res) => {
    const { id } = req.params;
    try {

        const listing = await Listing.findById(id).populate([{
            path: "reviews",
            select: "ownerName comment rating createdAt onwer"
        }, { path: "currentBooking", populate: { path: "guest", select: "-password" } }])
        if (!listing) {
            return res.json({ success: false, message: "Invalid " })
        }
        res.json({ success: true, listing })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}


//update listing by id and new data
export const updateListing = async (req, res) => {
    const { title, description, price, address, location, country } = req.body;

    const userId = req.user;


    const { id } = req.params;



    try {
        const listing = await Listing.findById(id);


        // if (listing.onwer !== userId._id) {
        //     return res.json({ success: false, message: "you are not onwer of this listing" })
        // }

        const imageFile = req.file;
        if (!imageFile) {

            await Listing.findByIdAndUpdate(id, {
                title, description, price, location, country,
                onwer: userId._id, address
            })

            return res.json({ success: true, message: "listing update successfull" })
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const image = [];
        image.push({
            filename: "asish",
            url: imageUpload.secure_url,
        })

        await Listing.findByIdAndUpdate(id, {
            title, description, price, location, country, image,
            onwer: userId._id, address
        })

        res.json({ success: true, message: "listing update successfull" })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

//get details for updates
export const getUpdateListingDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.json({ success: false, message: "Invalid " })
        }
        res.json({ success: true, listing })


    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


//delete listing 
export const deleteListing = async (req, res) => {
    const { id } = req.params;
    try {

        const listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.json({ success: false, message: "listing not exist " })
        }
        res.json({ success: true, message: "listing is deleted" })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

//create listing
export const createListing = async (req, res) => {
    const { title, description, price, address, location, country, guestType, category } = req.body;
    const userId = req.user;

    try {
        //  console.log(req.files)
        const imageFiles = req.files;

        const image = [];

        for (const imageFile of imageFiles) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path)

            // console.log(imageUpload)

            image.push({
                filename: imageUpload.originalname,
                url: imageUpload.secure_url,
            })
        }

        const newListing = new Listing({
            title, description, price, location, country, image,
            onwer: userId._id, address, guestType, category
        })
        await newListing.save();
        userId.totalPublicListings?.push(newListing._id);
        await userId.save();

        console.log("listing is created from here")
        return res.json({ success: true, newListing })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }


}


export const getAllListingHostByUser = async (req, res) => {

    try {
        const user = req.user;
        const _id = user._id;
        const Listings = await Listing.find({ onwer: _id });

        res.json({ success: true, Listings });
    } catch (err) {
        console.log(err)
    }

}