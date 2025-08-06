
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import AppContext from '../context/AppContext';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { assets } from './../assets/assets';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { toast } from 'react-toastify';

function Navbar() {
    const [open, setOpen] = React.useState(false)

    const isHostAirbnb = location.pathname.includes("/host/homes")

    const isbecomHouse = location.pathname.includes("/become-a-host")

    const { setUserToken, navigate, userData, setUserData, menuBarShow, setMenuBarShow, setState } = useContext(AppContext)


    const logout = async () => {
        localStorage.removeItem('air_bnb_token')
        setUserToken(null)

        toast.success("logout success full")
        navigate("/")
    }

    return (
        <>



            {/* <div className='flex justify-between px-4  sm:px-8 py-2 items-center fixed w-full bg-gray-600 border-b  top-0  border-gray-400'>
                <div className='cursor-pointer flex  flex-row gap-2 items-center'>
                    <img width={30} className=''
                        src={assets.logo}
                        onClick={() => navigate("/")} alt="" />

                </div>

                {
                    isHostAirbnb ?

                        <div className=' flex items-center gap-6 cursor-pointer' onClick={e => navigate("/become-a-host")} >

                            <p className='max-md:hidden' >Ready to Airbnb it?</p>
                            <div className=' flex items-center gap-2 border px-4 py-2 rounded-lg bg-red-700 text-white border-red-500'>
                                <AddHomeWorkIcon />
                                <p className='text-xl'> Airbnb Setup </p>
                            </div>
                        </div>

                        :
                        isbecomHouse ?
                            <div onClick={e => navigate("/")} className='border border-gray-800 px-4 py-2 cursor-pointer rounded-full'>
                                <p>Exit</p>
                            </div>


                            :

                            <div className='flex gap-4 items-center'>
                                <Link to="/host/homes" className='hidden md:block '  >
                                    Air bnb Your Home
                                </Link>
                                <div className=' cursor-pointer flex gap-2 items-center border px-4 py-1.5 rounded-full border-gray-300'
                                    onClick={e => setMenuBarShow(true)}>
                                    <MenuIcon />
                                    {
                                        userData ? <>

                                            <p className='bg-blue-700 px-3 py-1.5 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600' >  {userData.name[0].toUpperCase()}</p>

                                        </>
                                            :

                                            <PersonIcon />
                                    }
                                </div>
                                {
                                    menuBarShow &&

                                    <div className=' cursor-pointer absolute top-20 right-10 border-2 border-gray-500 rounded-xl px-4 py-2 bg-gray-700'>
                                        {
                                            !userData && <>
                                                <div className='flex flex-col gap-2 border-b border-gray-400 pb-2'>
                                                    <Link to="/auth" onClick={e => setState("SignUp")} >
                                                        SignUp
                                                    </Link>
                                                    <Link to="/auth" onClick={e => setState("Login")} >
                                                        Login
                                                    </Link>
                                                </div>


                                            </>
                                        }
                                        <div className='pr-8'>
                                            <Link to="/host/homes" >
                                                <p>Air bnb your home</p>
                                            </Link>


                                            <p className='cursor-pointer mt-2' >Host an experience</p>
                                            <p className='cursor-pointer mt-2' >Help Center</p>

                                            {
                                                userData &&
                                                <>
                                                    <Link to={`/profile/${userData._id} `}>
                                                        Profile
                                                    </Link>
                                                    <p className='cursor-pointer ' onClick={(e) => { logout() }}>LogOut</p>

                                                </>
                                            }

                                        </div>

                                        <p onClick={e => setMenuBarShow(false)} className=' absolute top-0 right-0 p-2 cursor-pointer '><CloseIcon /></p>
                                    </div>
                                }
                            </div>




                }

            </div> */}



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

                    <NavLink onClick={e => setMenuBarShow(true)}>
                        {
                            userData ?
                                <p className='bg-blue-700 px-3 py-1.5 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600' >  {userData.name[0].toUpperCase()}</p>
                                :
                                <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                                    onClick={() => { navigate("/auth"); setState("Login") }}>
                                    Login
                                </button>
                        }
                    </NavLink>





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
