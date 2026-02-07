import { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import { LogOut, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

function MenubarShow() {

    const { setUserToken,
        navigate,
        userData,
        setMenuBarShow,
        setState } = useContext(AppContext)

    const [logoutFormShow, setLogoutFormShow] = useState(false)

    const logout = async () => {
        localStorage.removeItem('air_bnb_token')
        setUserToken(null)

        toast.success("logout success full")
        navigate("/")
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-start justify-end pt-20 px-4 sm:px-6 md:px-8"
            onClick={() => {
                setLogoutFormShow(false)
                setMenuBarShow(false)
            }}>
            <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()}>

                {/* User section - shows only when logged in */}
                {userData && (
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-xl">
                                {userData.name ? userData.name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                                <h3 className="font-medium">{userData.name || 'User'}</h3>
                                <p className="text-sm text-blue-100 truncate">{userData.email || ''}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Menu items */}
                <div className="p-4">
                    <ul className="space-y-2">
                        {/* Authentication options for non-logged in users */}
                        {!userData && (
                            <>
                                {/* login  */}
                                <li>
                                    <button
                                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
                                        onClick={() => {
                                            setState("SignUp")
                                            navigate("/auth")
                                            setLogoutFormShow(false)
                                            setMenuBarShow(false)
                                        }}
                                    >
                                        <span>Sign up</span>
                                    </button>
                                </li>

                                {/* singup */}
                                <li>
                                    <button
                                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition duration-200"
                                        onClick={() => {
                                            setState("Login")
                                            navigate("/auth")
                                            setLogoutFormShow(false)
                                            setMenuBarShow(false)
                                        }}
                                    >
                                        <span>Log in</span>
                                    </button>
                                </li>
                            </>
                        )}

                        {/* Host your home option */}
                        <li>
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
                                onClick={() => {
                                    setLogoutFormShow(false)
                                    setMenuBarShow(false)
                                    navigate(`/host/homes`)
                                }}
                            >
                                <span>Airbnb your home</span>
                            </button>
                        </li>

                        {/* Divider */}
                        <div className="my-3 border-t border-gray-200"></div>

                        {/* Profile option for logged in users */}
                        {userData && (
                            <>
                                {/* profile button */}
                                <li>
                                    <button
                                        className="w-full flex items-center gap-3 text-gray-700 hover:bg-gray-100 py-2.5 px-3 rounded-lg transition duration-200"
                                        onClick={() => {
                                            navigate(`/profile/${userData._id}`);
                                            setLogoutFormShow(false)
                                            setMenuBarShow(false)
                                        }}
                                    >
                                        <Settings className="w-5 h-5 text-gray-500" />
                                        <span>Profile</span>
                                    </button>
                                </li>

                                {/* logout button */}
                                <li>
                                    <button
                                        className="w-full flex items-center gap-3 text-red-600 hover:bg-red-50 py-2.5 px-3 rounded-lg transition duration-200"
                                        onClick={() => {
                                            setLogoutFormShow(true)
                                            setMenuBarShow(true)
                                        }}
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Log out </span>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Logout confirmation modal */}
            {logoutFormShow && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={() => {
                        setLogoutFormShow(false)
                        setMenuBarShow(false)
                    }}>
                    <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 ease-in-out"
                        onClick={(e) => e.stopPropagation()}>

                        <div className="flex items-center justify-center p-4 bg-red-100 rounded-full mx-auto w-16 h-16">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.211.538c1.042.059 1.91.556 2.433 1.566l8.561 17.283c.83 1.747-.455 4.098-2.565 4.131H3.4c-1.92-.03-3.495-2.21-2.555-4.15L9.566 2.085c.164-.31.238-.4.379-.562C10.511.866 11.13.515 12.21.538m-.14 1.908a.97.97 0 0 0-.792.485 574 574 0 0 0-8.736 17.311c-.26.585.187 1.335.841 1.367q8.637.14 17.272 0c.633-.03 1.108-.756.844-1.36a572 572 0 0 0-8.575-17.312c-.175-.31-.431-.497-.855-.491" fill="#DC2626" />
                                <path d="M12.785 16.094h-1.598l-.175-7.851h1.957zm-1.827 2.401q0-.434.283-.722.283-.287.772-.287t.772.287a1 1 0 0 1 .283.722.97.97 0 0 1-.275.703q-.276.284-.78.284-.505 0-.78-.284a.97.97 0 0 1-.275-.703" fill="#DC2626" />
                            </svg>
                        </div>

                        <h2 className="text-gray-900 text-xl font-semibold mt-4 text-center">Log out</h2>
                        <p className="text-gray-600 mt-2 text-center">
                            Are you sure you want to log out of your account?
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
                            <button
                                className="w-full font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-xl transition duration-200"
                                onClick={() => {
                                    setLogoutFormShow(false)
                                    setMenuBarShow(false)
                                }}>
                                Cancel
                            </button>
                            <button
                                className="w-full font-medium text-white bg-red-600 hover:bg-red-700 py-3 px-4 rounded-xl transition duration-200"
                                onClick={() => {
                                    setLogoutFormShow(false)  // hide logout conformation
                                    setMenuBarShow(false)  //hide menu show
                                    logout() //calling to logout
                                }}>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}

export default MenubarShow
