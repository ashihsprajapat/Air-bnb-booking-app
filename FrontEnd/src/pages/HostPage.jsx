
import  { useState } from 'react'
import { MapPin, Home, Calendar, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import AppContext from './../context/AppContext';

function HostPage() {
    const [estimatedEarnings, setEstimatedEarnings] = useState(2025);
    const [nightlyRate, setNightlyRate] = useState(3649);
    const [nights, setNights] = useState(12);
    

    const {navigate}= useContext(AppContext)

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero section with card layout */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left content */}
                        <div className="p-6 sm:p-10 lg:p-12 lg:w-1/2 flex flex-col justify-center">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                                Airbnb it.
                            </h1>

                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl text-gray-700 mb-2">You could earn</h2>
                                <div className="flex items-baseline gap-2">
                                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">₹{estimatedEarnings.toLocaleString()}</h2>
                                    <span className="text-gray-500">per month</span>
                                </div>
                                <p className="mt-3 text-gray-600">
                                    <span className="font-medium text-rose-500 hover:underline cursor-pointer">{nights} nights</span> at an estimated
                                    <span className="font-medium">₹{nightlyRate.toLocaleString()}</span> a night
                                </p>
                                <button className="mt-2 text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 transition duration-200">
                                    Learn how we estimate your earnings
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* Location selector */}
                            <div className="mt-4 bg-white border border-gray-300 hover:border-gray-400 rounded-xl p-4 shadow-sm hover:shadow transition duration-200 cursor-pointer">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-rose-100 rounded-lg">
                                        <MapPin className="text-rose-500" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Jaipur</h3>
                                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                                            <Home size={14} />
                                            <p>Entire place · 2 bedrooms</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                                            <Calendar size={14} />
                                            <p>Available year-round</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            
                                <button className="mt-8 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5"
                                onClick={()=> navigate("/become-a-host")}>
                                    Get started
                                </button>
                                
                        </div>

                        {/* Right image */}
                        <div className="lg:w-1/2 relative">
                            <img
                                className="h-full w-full object-cover"
                                src="https://dawchihliou.github.io/optimized/articles/custom-google-maps-marker/airbnb-map-screenshot.webp"
                                alt="Beautiful home interior"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20"></div>
                        </div>
                    </div>
                </div>

                {/* Benefits section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Airbnb it with confidence</h3>
                        <p className="text-gray-600">We offer top-tier insurance coverage and protection against damages.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Earn extra income</h3>
                        <p className="text-gray-600">Turn your extra space into extra income with Airbnb hosting.</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Host support</h3>
                        <p className="text-gray-600">From 24/7 customer support to host communities, we're here to help.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostPage
