import {model} from "mongoose";

import listingSchema from "../Schemas/listingSchema.js";

const Listing=model("Listing",listingSchema);

export default Listing;