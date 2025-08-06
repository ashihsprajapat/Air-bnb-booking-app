
import React, { useContext, useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useParams, NavLink, useNavigate } from 'react-router-dom'
import { assets } from './../assets/assets';
import AppContext from './../context/AppContext';
import { Home, List, Calendar, Settings, LogOut, User } from 'lucide-react';

function ProfileShow() {
    const navigate = useNavigate();
    const location = useLocation();
    const [currDashboard, setCurrDashboard] = useState(0);
    const { id } = useParams();
    const { userData, userToken } = useContext(AppContext);

    // Set active tab based on current path
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('all-listings')) {
            setCurrDashboard(0);
        } else if (path.includes('all-booking')) {
            setCurrDashboard(2);
        } else {
            setCurrDashboard(1);
        }
    }, [location.pathname]);


    const sidebarLinks = [
        { name: "My Listings", path: `/profile/${id}/all-listings`, icon: <Home className="w-5 h-5" /> },
        { name: "Manage Listing", path: `/profile/${id}/${userData?._id || 'listing'}`, icon: <List className="w-5 h-5" /> },
        { name: "All Bookings", path: `/profile/${id}/all-booking`, icon: <Calendar className="w-5 h-5" /> },
    ];


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-4 bg-white shadow-sm">
                <a href="/" className="flex items-center gap-2">
                    <img className="h-8" src={assets.logo_2} alt="Airbnb Logo" />
                    <span className="font-semibold text-rose-500 hidden md:block">Dashboard</span>
                </a>
                <div className="flex items-center gap-4">
                    {userData && (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block">
                                <p className="text-sm font-medium">Welcome back,</p>
                                <p className="text-gray-700 font-semibold">{userData.name || 'User'}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                                {userData.profilePic ? (
                                    <img src={userData.profilePic} alt="Profile" className="h-full w-full rounded-full object-cover" />
                                ) : (
                                    <User className="h-5 w-5" />
                                )}
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            localStorage.removeItem('air_bnb_token');
                            setUserToken(null)
                            navigate('/');
                        }}
                        className='flex items-center gap-1 border border-gray-300 rounded-full text-sm px-3 py-1.5 hover:bg-gray-100 transition-colors'
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden md:inline">Logout3</span>
                    </button>
                </div>
            </div>

            <div className='flex flex-col md:flex-row min-h-[calc(100vh-73px)]'>
                {/* Sidebar */}
                <div className="md:w-64 w-full border-r border-gray-200 bg-white md:min-h-[calc(100vh-73px)]">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-800">User Dashboard</h2>
                        <p className="text-sm text-gray-500">Manage your listings and bookings</p>
                    </div>
                    <nav className="p-2">
                        {sidebarLinks.map((item, index) => (
                            <Link
                                to={item.path}
                                key={index}
                                onClick={() => setCurrDashboard(index)}
                                className={`flex items-center py-3 px-4 gap-3 rounded-lg mb-1 transition-all duration-200
                                ${index === currDashboard
                                        ? "bg-rose-50 text-rose-600 font-medium"
                                        : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className='flex-1 p-4 md:p-6 overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProfileShow

