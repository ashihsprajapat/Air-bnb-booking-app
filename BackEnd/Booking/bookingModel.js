
import { model } from "mongoose";
import bookingSchema from "./bookingSchema.js";

export const Booking = model("Booking", bookingSchema);

