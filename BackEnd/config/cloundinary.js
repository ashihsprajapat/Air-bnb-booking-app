

//export  { storage, cloudinary };


import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const connectToCloudinary=()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_kEY,
        api_secret: process.env.CLOUD_API_SECRET,
    
    })
}


export default connectToCloudinary;
