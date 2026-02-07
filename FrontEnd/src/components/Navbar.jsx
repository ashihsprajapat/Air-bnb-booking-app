import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AppContext from '../context/AppContext';
import { assets } from './../assets/assets';

function Navbar() {
    const [open, setOpen] = useState(false);

    const { navigate, userData, setMenuBarShow, setState } =
        useContext(AppContext);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">

            {/* Logo */}
            <NavLink to="/">
                <img
                    className="w-20 sm:w-24 md:w-28 lg:w-32 cursor-pointer"
                    src={assets.logo_2}
                    alt="logo"
                    onClick={() => navigate('/')}
                />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

                {/* Search */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                </div>

                <NavLink to="/host/homes">Air bnb Your Home</NavLink>

                {/* Profile / Login */}
                {userData ? (
                    <div
                        onClick={() => {
                            setMenuBarShow(true);
                            navigate(`/profile/${userData._id}/all-listings`);
                        }}
                        className="bg-blue-700 px-3 py-1.5 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600"
                    >
                        {userData.name[0].toUpperCase()}
                    </div>
                ) : (
                    <button
                        className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
                        onClick={() => {
                            setState('Login');
                            navigate('/auth');
                        }}
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                className="sm:hidden"
            >
                <svg width="21" height="15" viewBox="0 0 21 15">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div
                className={`${open ? 'flex' : 'hidden'
                    } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col gap-3 px-5 text-sm sm:hidden`}
            >
                <NavLink to="/host/homes" onClick={() => setOpen(false)}>
                    Air bnb your home
                </NavLink>

                {userData ? (
                    <div
                        className="bg-blue-700 px-3 py-1.5 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600 w-fit"
                        onClick={() => {
                            setMenuBarShow(true);
                            navigate(`/profile/${userData._id}/all-listings`);
                            setOpen(false);
                        }}
                    >
                        {userData.name[0].toUpperCase()}
                    </div>
                ) : (
                    <button
                        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-fit"
                        onClick={() => {
                            setState('Login');
                            navigate('/auth');
                            setOpen(false);
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
