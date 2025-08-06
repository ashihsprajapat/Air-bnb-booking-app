import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();



const Url = process.env.URL_DB;


async function connectToDataBase() {
    await mongoose.connect(`${Url}/air-bnb-Project`);
}

    

    export default  connectToDataBase;
