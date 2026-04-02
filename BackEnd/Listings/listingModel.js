import {model} from "mongoose";

import listingSchema from "./listingSchema.js";

const Listing=model("Listing",listingSchema);

export default Listing;