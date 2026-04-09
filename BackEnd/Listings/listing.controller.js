import cloudinary from 'cloudinary';
import Listing from './listingModel.js';
import client from '../config/Redis.js';
import {templetListingCreate, transport} from '../config/NodeMailer.js'
import User from '../User/userModel.js';
//get all listings
export const getAllListings = async (req, res) => {
    try {
      // await client.expire("Listing",1)
      //return res.json({message:"Something went wrong", success:false})
       // const allList= await Listing.find({})
       // console.log(allList.length)
        let listingInRedis= await client.lRange("Listing",0, -1)
        if(listingInRedis.length >1){
            const data= listingInRedis.map((listing)=> JSON.parse(listing))
            
            return  res.json(  { success:true,  Listings : data})
        }
        const Listings = await Listing.find({}).populate('_id').select('-password')
        

        res.json({ success: true, Listings, tip:"Data"  });
        for(let l  of  Listings){
            await  client.lPush('Listing', JSON.stringify( l));
        }
        await client.expire("Lisiting", 3600 );


    } catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}

//get a single listing by id
export const getListingById = async (req, res) => {
    const { id } = req.params;
    try {

        const Redlisting= await client.get(`Listing:${id}`);
        if(Redlisting){
            let listing= JSON.parse( Redlisting);
            return res.json({success:true,  listing})
        }

        const listing = await Listing.findById(id).populate([{
            path: "reviews",
            select: "ownerName comment rating createdAt onwer"
        }, { path: "currentBooking", populate: { path: "guest", select: "-password" } }])
        if (!listing) {
            return res.json({ success: false, message: "Invalid " })
        }
        res.json({ success: true, listing })
        await client.set(`Listing:${id}`, JSON.stringify(listing), {EX:300})
       // await client.expire(`Listing:${id}`, );
       
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}


//update listing by id and new data
export const updateListing = async (req, res) => {
    const { title, description, price, address, location, country } = req.body;
    console.log(req.body)

    const user = req.user;
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if(!listing)
            return res.json({success:false, message:"Listing is not found "})
        console.log(listing)
         if (!userId._id.requals(String(listing.onwer))) {
             return res.json({ success: false, message: "you are not onwer of this listing" })
         }

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

        const updateListingn= await Listing.findByIdAndUpdate(id, {
            title, description, price, location, country, image,
            onwer: userId._id, address
        })

        console.log(updateListingn)

        res.json({ success: true,updateListingn, message: "listing update successfull" })

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
    let user= req.user
    
    const { id } = req.params;
    try {

        const listing = await Listing.findById( id);
        
         if (!listing) {
            return res.json({ success: false, message: "listing not exist " })
        }

        if(!listing.onwer.equals(user._id)){
            return res.json({success:false,  message:"Your are not owner of this listing "})
        }

        const deleteListing  = await Listing.findByIdAndDelete(id);
       user.totalPublicListings= user.totalPublicListings.filter((id)=> !id.equals(listing._id))
        await user.save();
         

        res.json({ success: true, message: "listing is deleted" })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}

//create listing
export const createListing = async (req, res) => {
    let  { title, description, price, address, location, country, guestType, category } = req.body;
    
    const user = await User.findById(req.user._id);
    address= JSON.parse(address);

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
            onwer: user._id, address, guestType, category
        })
        await newListing.save();
        user.totalPublicListings?.push(newListing._id);
        await user.save();

        res.json({ success: true, newListing, user, message:"Listing create successfully" })
        const content= templetListingCreate(newListing._id, user.email,  newListing)
        const info= await transport.sendMail(content);
        const Listings = await Listing.find({}).populate('_id').select('-password')
        
        await  client.lPush('Listing', JSON.stringify( newListing));
        
    } catch (err) {
        res.json({ success: false, message: err.message })
    }


}


export const getAllListingHostByUser = async (req, res) => {

    try {
        
        const user = req.user;
        const _id = user._id;
       // await client.expire(`userListing:${_id}`,1)
       // return res.json({success:false, message:"Something went wrong"})
        const listing= await client.lRange(`userListing:${_id}`, 0 , -1);
        
        if(listing.length   > 1){
            const Listings= listing.map((list)=> JSON.parse(list))
            return res.json({ success:true, Listings})
        }
        const Listings = await Listing.find({ onwer: _id });
        res.json({ success: true, Listings });
        for(let l of Listings){
            
        await client.lPush(`userListing:${_id}`, JSON.stringify(l));
        }
        await client.expire(`userListing:${_id}`, 300)

        
    } catch (err) {
        console.log(err)
    }

}