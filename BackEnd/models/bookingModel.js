
import { model } from "mongoose";
import bookingSchema from "../Schemas/bookingSchema.js";

export const Booking = model("Booking", bookingSchema);

