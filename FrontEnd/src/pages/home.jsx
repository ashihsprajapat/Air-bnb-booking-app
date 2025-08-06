
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
import LisitngCard from "../components/LisitngCard";
import HomePageSkeleton from './../components/skeletons/HomePageSkeleton';
import { Search, MapPin, Home as HomeIcon, Smartphone } from 'lucide-react';

function Home() {
    const { backendUrl, isHomePageLoading, setHomePageLoading } = useContext(AppContext);
    const [listings, setListings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = [
        { name: 'All', icon: <HomeIcon size={18} /> },
        { name: 'Beach', icon: <MapPin size={18} /> },
        { name: 'Mountain', icon: <MapPin size={18} /> },
        { name: 'City', icon: <MapPin size={18} /> },
        { name: 'Countryside', icon: <MapPin size={18} /> }
    ];

    const allData = async () => {
        setHomePageLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/listing/`)
            setListings(data.Listings.reverse())
        } catch (err) {
            console.log(err)
        } finally {
            setHomePageLoading(false);
        }
    }

    useEffect(() => {
        allData()
    }, [])

    // Filter listings based on search query and category
    const filteredListings = listings.filter(listing => {
        const matchesSearch = searchQuery === '' || 
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = activeCategory === 'All' || 
            listing.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    if (isHomePageLoading) {
        return <HomePageSkeleton />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-rose-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Find your perfect getaway
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Discover unique places to stay and experiences to try around the world
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by location or property name"
                                    className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-md"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-4">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.name ? 'bg-rose-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                        >
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Listings Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                {filteredListings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No listings found. Try a different search or category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredListings.map((listing, i) => (
                            <LisitngCard key={i} listing={listing} />
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile App Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-gradient-to-r from-indigo-50 to-rose-50 rounded-2xl overflow-hidden shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="p-8 md:p-12 max-w-md">
                            <div className="inline-block p-2 bg-indigo-100 rounded-full mb-4">
                                <Smartphone className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get the Airbnb App</h2>
                            <p className="text-gray-600 mb-6">Book unique places to stay and things to do, wherever you are in the world.</p>
                            
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                    <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.5,1.5h-11c-2.761,0-5,2.239-5,5v11c0,2.761,2.239,5,5,5h11c2.761,0,5-2.239,5-5v-11C22.5,3.739,20.261,1.5,17.5,1.5z M14.5,13.5l-3,1.73c-0.29,0.167-0.65-0.042-0.65-0.37v-3.46c0-0.328,0.36-0.537,0.65-0.37l3,1.73C14.79,12.93,14.79,13.33,14.5,13.5z"/>
                                    </svg>
                                    App Store
                                </button>
                                <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                                    <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.5,20.5c0,0.552,0.448,1,1,1h15c0.552,0,1-0.448,1-1v-17c0-0.552-0.448-1-1-1h-15c-0.552,0-1,0.448-1,1V20.5z M12,6.5c2.761,0,5,2.239,5,5s-2.239,5-5,5s-5-2.239-5-5S9.239,6.5,12,6.5z M12,14.5c1.657,0,3-1.343,3-3s-1.343-3-3-3s-3,1.343-3,3S10.343,14.5,12,14.5z"/>
                                    </svg>
                                    Google Play
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-1/3 lg:w-2/5">
                            <img 
                                className="h-full w-full object-cover" 
                                src="https://tse1.mm.bing.net/th/id/OIP.p3t-u_PDrPyBZmlSuRgd2wHaHa?pid=Api&P=0&h=180" 
                                alt="Airbnb mobile app" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;