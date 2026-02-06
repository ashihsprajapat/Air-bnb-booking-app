
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import AppContext from '../context/AppContext';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { assets } from './../assets/assets';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { toast } from 'react-toastify';
import { SignUp, useClerk, UserProfile, useUser, UserButton } from '@clerk/clerk-react';
import { MoveRight } from 'lucide-react'


function Navbar() {
    const { openSignIn } = useClerk()


    const [open, setOpen] = React.useState(false)

    const isHostAirbnb = location.pathname.includes("/host/homes")

    const isbecomHouse = location.pathname.includes("/become-a-host")

    const { setUserToken, navigate, userData, setUserData, menuBarShow, setMenuBarShow, setState, SignInButton, SignUpButton, user, isSignedIn, UserButton } = useContext(AppContext)

    console.log("User data in clerk", user)

    const logout = async () => {
        localStorage.removeItem('air_bnb_token')
        setUserToken(null)

        toast.success("logout success full")
        navigate("/")
    }

    return (
        <>

            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

                {/* logo of navbar  */}
                <NavLink to="/" className="m-0 mt-0"  >

                    <img className='  w-20 sm:w-24 md:w-28 lg:w-32 '
                        src={assets.logo_2}
                        onClick={() => navigate("/")} alt="" />
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-8">



                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                            <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <NavLink to="/host/homes"> Air bnb Your Home</NavLink>

                    {
                        isSignedIn ?
                            <UserButton />
                            :
                            <button
                                onClick={() => openSignIn({})}
                                type="button"
                                className=" border bg- bg-red-400  border-red-700 text-white font-semibold  px-3 py-1 rounded-xl "
                            >
                                Login

                            </button>
                    }


                    {/* <NavLink onClick={e => setMenuBarShow(true)}>
                        {
                            userData ?
                                <p className='bg-blue-700 px-3 py-1.5 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600' >  {userData.name[0].toUpperCase()}</p>
                                :
                                <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                                    onClick={() => { navigate("/auth"); setState("Login") }}>
                                    Login
                                </button>
                        }
                    </NavLink> */}





                </div>

                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                    {/* Menu Icon SVG */}
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="1.5" rx=".75" fill="#426287" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                    </svg>
                </button>

                {/* Mobile Menu */}
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/host/homes" className="block"
                        onClick={() => setOpen(false)}>Air bnb your home</NavLink>

                    <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
                        onClick={e => { setState("Login"); navigate("/auth"); setOpen(false) }}>
                        Login
                    </button>
                </div>

            </nav>





        </>

    )
}

export default Navbar
