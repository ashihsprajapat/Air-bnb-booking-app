
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MapPin, IndianRupee, Calendar, User, Home, Star, Edit, Trash2, Clock, MessageSquare } from 'lucide-react'

import toast from 'react-hot-toast';

function OneListingProfile() {
    const { userData, backendUrl, userToken, navigate } = useContext(AppContext);
    const { list_id } = useParams();


    const { listing, setListing } = useContext(AppContext)
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'bookings'

    useEffect(() => {
        if (list_id && userToken) {
            fetchListingDetails();
            //fetchListingBookings();
        }
    }, [list_id, userToken]);

    const fetchListingDetails = async () => {
        try {
            setIsLoading(true);
            // This is a placeholder API call - update with your actual endpoint
            const { data } = await axios.get(`${backendUrl}/listing/${list_id}`, {
                headers: { token: userToken }
            });

            console.log("Fetch listing detilas", data)

            if (data.success) {
                setListing(data.listing);
                setBookings(data.listing.currentBooking)
            } else {
                toast.error(data.message || 'Failed to fetch listing details');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error fetching listing details');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchListingBookings = async () => {
        try {
            // This is a placeholder API call - update with your actual endpoint
            const { data } = await axios.get(`${backendUrl}/booking/listing/${list_id}`, {
                headers: { token: userToken }
            });

            if (data.success) {
                setBookings(data.bookings || []);
            } else {
                toast.error(data.message || 'Failed to fetch booking details');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error fetching booking details');
        }
    };

    const handleDeleteListing = async () => {
        if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {

        }

        try {
            // This is a placeholder API call - update with your actual endpoint
            const { data } = await axios.delete(`${backendUrl}/listing/${list_id}/delete`, {
                headers: { token: userToken }
            });

            console.log("Delete listing data is ", data)

            if (data.success) {
                toast.success('Listing deleted successfully');
                navigate('/profile/' + userData._id + '/all-listings');
            } else {
                toast.error(data.message || 'Failed to delete listing');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error deleting listing');
        }
    };



    const handleEditListing = () => {
        navigate(`/edit/${list_id}`);
    };

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                            <div className="h-32 bg-gray-200 rounded mb-4"></div>
                        </div>
                        <div>
                            <div className="h-48 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="w-full text-center py-12">
                <div className="flex justify-center mb-4">
                    <Home className="w-16 h-16 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Listing Not Found</h3>
                <p className="text-gray-500 mb-6">The listing you're looking for doesn't exist or you don't have permission to view it.</p>
                <button
                    onClick={() => navigate('/profile/' + userData._id + '/all-listings')}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                    Back to My Listings
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header with actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{listing.title || 'Unnamed Listing'}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{listing.location || 'Location not specified'}</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                        onClick={handleEditListing}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>
                    <button
                        onClick={handleDeleteListing}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Main image */}
            <div className="mb-6 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                {listing.image && listing.image.length > 0 ? (
                    <img
                        src={listing.image[0].url}
                        alt={listing.title}
                        className="w-full h-64 md:h-80 object-cover"
                    />
                ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                        <Home className="w-16 h-16 text-gray-400" />
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Listing Details
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-rose-500 text-rose-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Bookings ({bookings.length})
                    </button>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'details' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left column - Listing details */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">About this place</h2>
                                <p className="text-gray-600">
                                    {listing.description || 'No description provided'}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Property Details</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Home className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Property Type</p>
                                            <p className="font-medium text-gray-700">{listing.propertyType || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Max Guests</p>
                                            <p className="font-medium text-gray-700">{listing.maxGuests || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Rating</p>
                                            <p className="font-medium text-gray-700">{listing.rating ? `${listing.rating}/5` : 'No ratings yet'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {listing.amenities && listing.amenities.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {listing.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                                <span className="text-gray-700">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {listing.rules && listing.rules.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">House Rules</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {listing.rules.map((rule, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                                                <span className="text-gray-700">{rule}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right column - Pricing and availability */}
                    <div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Availability</h3>

                            <div className="flex items-center gap-2 mb-4">
                                <IndianRupee className="w-5 h-5 text-gray-700" />
                                <span className="text-2xl font-bold text-gray-800">₹{listing.price || 0}</span>
                                <span className="text-gray-500">/ night</span>
                            </div>

                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-700">Availability</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {listing.availability ? 'Available for booking' : 'Currently unavailable'}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-700 mb-2">Listing Stats</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500">Total Bookings</p>
                                        <p className="text-lg font-semibold text-gray-800">{bookings.length || 0}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-xs text-gray-500">Views</p>
                                        <p className="text-lg font-semibold text-gray-800">{listing.views || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => window.open(`/listing/${list_id}`, '_blank')}
                                    className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                                >
                                    View Public Listing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking History</h2>

                        {bookings && bookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Guest
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dates
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Booked On
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <User className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {booking.guest?.name || 'Guest'}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {booking.guest?.email || 'Email not available'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {booking.bookingDuration ? new Date(booking.bookingDuration.from).toLocaleDateString() : 'Not set'} to
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.bookingDuration ? new Date(booking.bookingDuration.to).toLocaleDateString() : 'Not set'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">₹{booking.totalPrice || 0}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                        {booking.paymentStatus || 'Processing'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Unknown'}
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="flex justify-center mb-4">
                                    <Calendar className="w-12 h-12 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">No Bookings Yet</h3>
                                <p className="text-gray-500 mb-4">This listing hasn't received any bookings yet.</p>
                            </div>
                        )}
                    </div>
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

export default OneListingProfile
