

import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Calendar, MapPin, User, Clock, Home } from 'lucide-react';

function AllBookingListingProfile() {
    const { userData, navigate, backendUrl, userToken } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAllBookings = async () => {
        try {
            setIsLoading(true);
            // This is a placeholder API call - update with your actual endpoint
            const { data } = await axios.get(`${backendUrl}/booking/user-bookings`, {
                headers: { token: userToken }
            });
           // console.log("geting all booking listing are", data)

            if (data.success) {
                setBookings(data.bookings || []);
            } else {
                toast.error(data.message || 'Failed to fetch bookings');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error fetching bookings');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userToken) {
            getAllBookings();
        }
    }, [userToken]);

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Your Bookings</h1>
                    <p className="text-gray-600">Manage all your bookings in one place</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Your Bookings</h1>
                <p className="text-gray-600">Manage all your bookings in one place</p>
            </div>

            {bookings && bookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                            {booking.listing.image.length > 0 ? (
                                <img
                                    src={booking.listing.image[0].url}
                                    alt={booking.listing.title || 'Booking'}
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                    <Home className="w-10 h-10 text-gray-400" />
                                </div>
                            )}

                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                    {booking.listing.title || 'Unnamed Booking'}
                                </h3>

                                <div className="flex items-start gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <p className="text-gray-600 text-sm">
                                        {booking.listing.location || 'Location not specified'}
                                    </p>
                                </div>

                                <div className="flex items-start gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="text-gray-600 text-sm">
                                            {booking.bookingDuration ? new Date(booking.bookingDuration.from).toLocaleDateString() : 'Check-in date not set'}
                                            {' '} to {' '}
                                            {booking.bookingDuration ? new Date(booking.bookingDuration.to).toLocaleDateString() : 'Check-out date not set'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 mb-4">
                                    <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <p className="text-gray-600 text-sm">
                                        Booked on {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Unknown date'}
                                    </p>
                                </div>
                                <div className="flex items-start gap-2 mb-4">
                                    <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <p className="text-gray-600 text-sm">
                                        Transaction ID : {booking.transaction || "12367890"}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div className="font-semibold text-gray-800">
                                        ₹{booking.totalPrice || 'Price not available'}
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.paymentStatus || 'Processing'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <Calendar className="w-16 h-16 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                        Explore Listings
                    </button>
                </div>
            )}
        </div>
    )
}

// Helper function to get status color
function getStatusColor(status) {
    switch (status?.toLowerCase()) {
        case 'confirmed':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        case 'completed':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default AllBookingListingProfile
