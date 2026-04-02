import {model} from "mongoose";

import userSchema from "./userSchema.js";
const User=model("User",userSchema);
export default User;
