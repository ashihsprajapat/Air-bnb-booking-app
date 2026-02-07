import  { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { MapPin, Calendar, Home, Star, ArrowLeft, ArrowRight, Share2, Heart, Bookmark } from 'lucide-react';



function SingleListing() {

    const { id } = useParams();

    const { backendUrl, userToken, userData } = useContext(AppContext);

    const [listing, setListing] = useState(null);

    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const [price, setPrice] = useState(1);



    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [reviewSubLoading, setReviewSubLoading] = useState(false);

    const [allReview, setAllReviews] = useState([])




    const GetListingData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/listing/${id}`)
           // console.log("single listing data is ", data)
            if (data.success) {
                setListing(data.listing);
                if (data.listing && data.listing.image && data.listing.image.length > 0) {
                    setCurrentImage(data.listing.image[0].url);
                }
                setAllReviews(data.listing.reviews.reverse())
                setPrice(data.listing.price)
                setTotal(data.listing.price * 2);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetListingData();
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [id]);

    const handleImgChange = (url, index) => {
        setCurrentImage(url);
        setCurrentImageIndex(index);
    }

    const nextImage = () => {
        if (listing && listing.image && listing.image.length > 0) {
            const nextIndex = (currentImageIndex + 1) % listing.image.length;
            setCurrentImageIndex(nextIndex);
            setCurrentImage(listing.image[nextIndex].url);
        }
    }

    const prevImage = () => {
        if (listing && listing.image && listing.image.length > 0) {
            const prevIndex = (currentImageIndex - 1 + listing.image.length) % listing.image.length;
            setCurrentImageIndex(prevIndex);
            setCurrentImage(listing.image[prevIndex].url);
        }
    }


    // for creat reviews 
    const createReview = async (e) => {
        // Prevent default form submission behavior that causes page reload
        e.preventDefault();
        if (!rating || !comment) {
            toast.error("Please provide both rating and comment");
            return;
        }

        if (!userToken) {
            toast.error("Please login to submit a review");
            return;
        }

        e.preventDefault()
        setReviewSubLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/revies/create-review/${id}`, {
                rating,
                comment
            }, {
                headers: {
                    token: userToken
                    //  Authorization: `Bearer ${userToken}` 
                }
            });


            if (data.success) {
                toast.success("Review submitted successfully");
                setRating(0);
                setComment("");
                allReview.unshift({ rating, comment, ownerName: userData.name, createdAt: Date.now(), })
            } else {
                toast.error(data.message);
            }

            setReviewSubLoading(false);

        } catch (err) {
            toast.error(err.message)
        }
    }


    // reviwe is delete
    const deleteReview = async (Rid) => {

        if (!userToken) {
            return
        }

        try {
            if (!id || !Rid) {
                toast.error("something went wrong")
            }


            const { data } = await axios.post(`${backendUrl}/revies/${id}/${Rid}/delete`,
                {},
                { headers: { token: userToken } })

            if (data.success) {
                toast.success("Review deleted successfully")
                setAllReviews(allReview => (
                    allReview.filter((review) => (review._id !== Rid))
                ))
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }


    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    }

    //for placing order like from to guest all details
    const [from, setFrom] = useState(new Date().toISOString().split('T')[0]);
    const [to, setTo] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    const [guestCount, setGuestCount] = useState(2);
    const [paymentStatus, setPaymentStatus] = useState("pending")
    const [total, setTotal] = useState(1);
    const [night, setNight] = useState(2);




    //maintain when from and to change then calculate totalPrice and nights also
    useEffect(() => {

        // Convert dates to milliseconds
        const fromDate = new Date(from).getTime();
        const toDate = new Date(to).getTime();

        // Calculate difference in days including both from and to dates
        const diffTime = toDate - fromDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setNight(diffDays);

        // Calculate total price
        setTotal(diffDays * price)


    }, [from, to])



    const initPay = async (order) => {
        //console.log("calling to verify function1")
        const options = {
            key: import.meta.env.VITE_ROZORPAY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Credits paymnets",
            description: "Credits paymnets",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
               // console.log(response);
                const token = userToken;
                try {
                    const { data } = await axios.post(`${backendUrl}/transaction/verify`, response, { headers: { token: userToken } })
                    
                    if (data.success) {
                        toast.success(data.message)
                        Navigate(`/profile/${userData._id}/all-booking`)

                    }
                } catch (error) {
                    console.log(error.message)
                }
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open()
    }

    const paymentRazorpay = async () => {
        try {
            const bookingData = {
                guests: guestCount,
                totalAmount: total,
                nights: night,
                bookingDuration: {
                    from,
                    to
                },
                pricePerNight: listing.price

            }


            const { data } = await axios.post(`${backendUrl}/transaction/payment/${id}`, bookingData, { headers: { token: userToken } })
            
            if (data.success) {
                initPay(data.order);

            } else {
                console.log(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="rounded-lg bg-gray-200 h-64 w-full max-w-3xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Home className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Listing Not Found</h2>
                <p className="text-gray-500 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
                <a href="/" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                    Back to Home
                </a>
            </div>
        );
    }



    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <a href="/" className="inline-flex items-center text-rose-500 hover:text-rose-700 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to listings
                </a>

                {/* Listing Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                        <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 text-rose-500 mr-1" />
                            <span>{listing.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 md:mt-0">
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Share this listing"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: listing.title,
                                        text: `Check out this amazing place: ${listing.title}`,
                                        url: window.location.href
                                    }).catch(err => {
                                        console.log('Error sharing:', err);
                                    });
                                } else {
                                    // Fallback for browsers that don't support Web Share API
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success('Link copied to clipboard!');
                                }
                            }}
                        >
                            <Share2 className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isFavorite ? 'text-rose-500' : 'text-gray-700'}`}
                            onClick={toggleFavorite}
                            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="md:col-span-2 relative rounded-xl overflow-hidden">
                    <img
                        src={currentImage}
                        className="w-full h-[400px] md:h-[500px] object-cover"
                        alt={listing.title}
                    />

                    {/* Navigation arrows */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button
                            onClick={prevImage}
                            className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-800" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                            aria-label="Next image"
                        >
                            <ArrowRight className="w-5 h-5 text-gray-800" />
                        </button>
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {listing.image ? listing.image.length : 0}
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-4 h-[500px] overflow-y-auto">
                    {listing.image && listing.image.map((img, i) => (
                        <div
                            key={i}
                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${currentImageIndex === i ? 'ring-2 ring-rose-500' : 'hover:opacity-90'}`}
                            onClick={() => handleImgChange(img.url, i)}
                        >
                            <img
                                src={img.url}
                                alt={`View of ${listing.title} - ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex md:hidden overflow-x-auto space-x-2 pb-4 mb-6">
                {listing.image && listing.image.map((img, i) => (
                    <div
                        key={i}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${currentImageIndex === i ? 'ring-2 ring-rose-500' : 'hover:opacity-90'}`}
                        onClick={() => handleImgChange(img.url, i)}
                    >
                        <img
                            src={img.url}
                            alt={`View of ${listing.title} - ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Listing Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">About this place</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {listing.description || 'No description provided for this listing.'}
                        </p>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-medium mb-4">Property details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <Home className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Property type</p>
                                        <p className="font-medium">{listing.category || 'Home'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Listed on</p>
                                        <p className="font-medium">{new Date(listing.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                        <div className="flex items-baseline justify-between mb-4">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold">₹{listing.price}</span>
                                <span className="text-gray-600 ml-1">/night</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-rose-500 fill-rose-500" />
                                <span className="ml-1 font-medium">4.9</span>
                            </div>
                        </div>


                        <form onSubmit={(e) => {
                            e.preventDefault();
                            address: listing.location


                        }}>
                            <div>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    <div className="border border-gray-300 rounded-tl-lg rounded-bl-lg p-3">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                                        <input value={from} onChange={(e) => setFrom(e.target.value)} type="date" className="w-full text-sm focus:outline-none" />
                                    </div>
                                    <div className="border border-gray-300 rounded-tr-lg rounded-br-lg p-3">
                                        <label className="block text-xs font-medium text-gray-700 mb-1">to</label>
                                        <input value={to} onChange={(e) => setTo(e.target.value)} type="date" className="w-full text-sm focus:outline-none" />
                                    </div>
                                </div>

                                <div className="border border-gray-300 rounded-lg p-3 mb-4">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
                                    <select className="w-full text-sm focus:outline-none bg-transparent" value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value))} >
                                        {
                                            [1, 2, 3, 4, 5].map((guest, i) => (
                                                <option key={i} >{guest} {guest === 1 ? "guest" : "guests"} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {listing.currentBooking.find(
                                    booking =>
                                        new Date(booking.bookingDuration.from) <= new Date(to) &&
                                        new Date(booking.bookingDuration.to) >= new Date(from)
                                ) ? listing.isBook === userData?._id ? (
                                    // 🟩 If current user already booked it
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <h2 className="text-xl font-semibold text-green-700">
                                            You have already booked this place
                                        </h2>
                                    </div>
                                ) : (

                                    // 🟥 If overlap found → show "already booked"
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            This property is already booked for the selected dates
                                        </h2>
                                        <p className="text-gray-600 mt-2">
                                            Please try different dates or check our other listings.
                                        </p>
                                    </div>
                                ) : (
                                    // 🟦 Otherwise, show Payment button
                                    <button
                                        className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        type="button"
                                        disabled={isLoading || !userToken}
                                        onClick={() => {
                                            if (!userToken) {
                                                toast.error('Please login to continue');
                                                return;
                                            }
                                            paymentRazorpay();
                                        }}
                                    >
                                        {isLoading ? 'Processing...' : userToken ? 'Proceed to Payment' : 'Please Login to Book'}
                                    </button>
                                )}

                                <p className="text-center text-sm text-gray-500 mt-4">Secure payment powered by Razorpay</p>

                                <div className="border-t border-gray-100 mt-6 pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span>₹{listing.price} × {night} nights</span>
                                        <span>₹{total}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Cleaning fee</span>
                                        <span>₹1,200</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Service fee</span>
                                        <span>₹{Math.round(listing.price * 5 * 0.12)}</span>
                                    </div>
                                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>
                            </div>
                        </form>






                    </div>
                </div>

            </div>

            {/* after listing detail add a map for listing location */}
            {/* Map Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Location</h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                            <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                            <div>
                                <h3 className="font-medium text-gray-900">{listing.location}</h3>
                                <p className="text-gray-600 text-sm">Exact location provided after booking</p>
                            </div>
                        </div>

                        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">

                            <iframe
                                title="Property Location"
                                className="w-full h-full border-0"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Great location score</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>15 min to city center</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Popular nearby places</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                    <span>Local markets within 500m</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                    <span>Public transportation nearby</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                    <span>Restaurants and cafes in walking distance</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* revie creating by form rating and comment  */}
            <div>
                <form onSubmit={createReview} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Write a Review</h2>
                        <p className="text-gray-600">Share your experience with other travelers</p>
                        <label htmlFor="rating">Rating</label>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`transition-all duration-200 transform hover:scale-110 focus:outline-none ${rating >= star
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                >
                                    <svg
                                        className={`w-8 h-8 ${rating >= star
                                            ? 'fill-yellow-400'
                                            : 'fill-gray-300'
                                            }`}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            id="comment"
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-y transition duration-200 ease-in-out text-gray-700 placeholder-gray-400"
                            placeholder="Share your thoughts and experience about this place..."
                            maxLength={500}
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='mt-6 w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        disabled={reviewSubLoading}
                    >
                        {reviewSubLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>

            {/*  review shows  */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
                {allReview.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allReview.map((review) => (
                            <div key={review._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 flex items-center justify-center">
                                            <span className="text-white font-medium">
                                                {review.ownerName?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                                {review.ownerName ? review.ownerName : 'Anonymous'}
                                            </h3>
                                            <div className="flex items-center">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                                <span className="ml-1 font-medium">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2 line-clamp-3">{review.comment}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <time dateTime={review.createdAt}>
                                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        {userData && userData._id === review.onwer && (
                                            <div className="group">
                                                <button className=" hidden group-hover:block absolute hover:bg-gray-100 rounded-full p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </button>
                                                <div className="hidden group-hover:block absolute right-0  w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                    <button
                                                        onClick={() => deleteReview(review._id)}
                                                        className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        Delete Review
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
                        <p className="text-gray-600">Be the first one to review this place!</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default SingleListing
