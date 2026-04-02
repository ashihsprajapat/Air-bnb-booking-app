import mongoose,{model} from "mongoose";

import reviewsSchema from "./reviewsSchema.js";


const Review = model("Review", reviewsSchema);

export default Review;