
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export   const transport= nodemailer.createTransport({
    service: "gmail",
    secure:true,
    auth: {
        user: process.env.NodeMail,
        pass : process.env.NodeMailPassword
    }
})

export const templetOTPMail = (mail, otp) => {
    return {
        from: "airbnbbookingproject@gmail.com",
        to: mail,
        subject: "Verify Your Email - Airbnb Booking",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <div style="background: #FF385C; padding: 20px; text-align: center; color: white;">
                    <h2 style="margin: 0;">Airbnb Booking</h2>
                    <p style="margin: 5px 0 0;">Verify Your Email</p>
                </div>

                <!-- Body -->
                <div style="padding: 30px; text-align: center;">
                    <h3 style="color: #333;">Hello 👋</h3>
                    <p style="color: #555; font-size: 14px;">
                        Thank you for signing up with <b>Airbnb Booking</b>.  
                        Please use the OTP below to verify your email address.
                    </p>

                    <!-- OTP Box -->
                    <div style="margin: 20px 0;">
                        <span style="
                            display: inline-block;
                            background: #f1f1f1;
                            padding: 15px 25px;
                            font-size: 24px;
                            letter-spacing: 5px;
                            font-weight: bold;
                            border-radius: 8px;
                            color: #FF385C;
                        ">
                            ${otp}
                        </span>
                    </div>

                    <p style="color: #777; font-size: 13px;">
                        This OTP is valid for <b>1 minute</b>. Do not share it with anyone.
                    </p>
                </div>

                <!-- Footer -->
                <div style="background: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                    <p style="margin: 0;">If you didn’t request this, you can safely ignore this email.</p>
                    <p style="margin: 5px 0 0;">© 2026 Airbnb Booking. All rights reserved.</p>
                </div>
            </div>
        </div>
        `
    }
}

export const templetListingCreate = (id, mail, listing) => {

    const listingUrl = `https://air-bnb-booking-app-psi.vercel.app/${id}`;

    return {
        from: "airbnbbookingproject@gmail.com",
        to: mail,
        subject: "🎉 Your Listing is Live - Airbnb Booking",
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
            <div style="max-width: 550px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <div style="background: #FF385C; padding: 20px; text-align: center; color: white;">
                    <h2 style="margin: 0;">Airbnb Booking</h2>
                    <p style="margin: 5px 0 0;">Your Listing is Live 🎉</p>
                </div>

                <!-- Body -->
                <div style="padding: 25px;">
                    <h3 style="color: #333;">Congratulations! 👏</h3>
                    <p style="color: #555; font-size: 14px;">
                        Your listing has been successfully created and is now live on our platform.
                    </p>

                    <!-- Image -->
                    <div style="text-align: center; margin: 20px 0;">
                        <img src="${listing?.image?.[0]?.url}" 
                             alt="listing image" 
                             style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 10px;" />
                    </div>

                    <!-- Listing Details -->
                    <div style="background: #fafafa; padding: 15px; border-radius: 8px;">
                        <p><b>🏡 Title:</b> ${listing.title}</p>
                        <p><b>📍 Location:</b> ${listing.location}, ${listing?.address?.city || ""}, ${listing?.address?.state || ""}</p>
                        <p><b>💰 Price:</b> ₹${listing.price} / night</p>
                        <p><b>🏷️ Category:</b> ${listing.category || "N/A"}</p>
                        <p><b>👥 Guest Type:</b> ${listing.guestType || "N/A"}</p>
                    </div>

                    <!-- Description -->
                    <p style="margin-top: 15px; font-size: 13px; color: #666;">
                        ${listing.description?.slice(0, 120)}...
                    </p>

                    <!-- Button -->
                    <div style="text-align: center; margin-top: 25px;">
                        <a href="${listingUrl}" target="_blank"
                            style="
                                display: inline-block;
                                padding: 12px 25px;
                                background: #FF385C;
                                color: white;
                                text-decoration: none;
                                border-radius: 6px;
                                font-weight: bold;
                            ">
                            View Your Listing
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                    <p style="margin: 0;">You can manage or edit your listing anytime from your dashboard.</p>
                    <p style="margin: 5px 0 0;">© 2026 Airbnb Booking. All rights reserved.</p>
                </div>
            </div>
        </div>
        `
    }
}