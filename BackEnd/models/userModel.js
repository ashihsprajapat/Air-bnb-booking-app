import {model} from "mongoose";

import userSchema from "../Schemas/userSchema.js";
const User=model("User",userSchema);
export default User;
