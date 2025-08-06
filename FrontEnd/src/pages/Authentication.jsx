
import React, { useContext, useState } from 'react'
import { assets } from './../assets/assets';
import AppContext from '../context/AppContext';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';


function Authentication() {
    const { backendUrl, setUserToken, navigate, state, setState, isLoading, setIsLoading } = useContext(AppContext);
    // console.log(backendUrl)


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Image, setImage] = useState(null);

    const onSubmithandler = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        //call to backend




        if (state === 'Login') {


            setIsLoading(true);
            try {

                const { data } = await axios.post(`${backendUrl}/auth/login`, { email, password })
            
                setPassword("");

                if (data.success) {
                    localStorage.setItem("air_bnb_token", data.token);
                    navigate("/")
                    setUserToken(data.token)
                    toast.success("login successfull")
                } else {
                    toast.error(data.message)
                    setEmail("");
                }

            } catch (err) {
                toast.error(err.message);

            } finally {
                setIsLoading(false);
            }



        } else {
            setIsLoading(true)
            try {
                const { data } = await axios.post(`${backendUrl}/auth/register`, {
                    name, email, password
                })

                if (data.success) {
                    setName("");
                    setEmail('');
                    setPassword("");
                    localStorage.setItem("air_bnb_token", data.token)
                    toast.success(data.message);
                    navigate("/")
                    setUserToken(data.token)
                } else {
                    toast.error(data.message)
                    setPassword("");
                    setEmail('');

                }
            } catch (err) {
                toast.error(err.message)
                setIsLoading(false);
            } finally {
                setIsLoading(false)
            }
        }


    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-10 rounded-xl shadow-md">
                <div className="text-center">
                    <img className="mx-auto h-12 w-auto" src={assets.logo} alt="Airbnb Logo" />
                    <h1 className="mt-6 text-3xl font-extrabold text-gray-900">User {state}</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        {state === 'Login' ? 'Sign in to your account' : 'Create your account'}
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={onSubmithandler}>
                    <div className="space-y-4 rounded-md">
                        {state === 'SignUp' && (
                            <div className="relative">
                                <label htmlFor="name" className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
                                    <div className="flex items-center justify-center h-10 w-10 bg-gray-50">
                                        <img className="h-5 w-5" src={assets.person_icon} alt="Person icon" />
                                    </div>
                                    <input 
                                        id="name"
                                        name="name" 
                                        type="text" 
                                        required 
                                        className="block w-full px-3 py-2 border-0 outline-none text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" 
                                        placeholder="Enter your name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                        
                        <div className="relative">
                            <label htmlFor="email" className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
                                <div className="flex items-center justify-center h-10 w-10 bg-gray-50">
                                    <img className="h-5 w-5" src={assets.email_icon} alt="Email icon" />
                                </div>
                                <input 
                                    id="email"
                                    name="email" 
                                    type="email" 
                                    autoComplete="email" 
                                    required 
                                    className="block w-full px-3 py-2 border-0 outline-none text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" 
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="password" className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
                                <div className="flex items-center justify-center h-10 w-10 bg-gray-50">
                                    <img className="h-5 w-5" src={assets.lockicon} alt="Lock icon" />
                                </div>
                                <input 
                                    id="password"
                                    name="password" 
                                    type="password" 
                                    autoComplete="current-password" 
                                    required 
                                    className="block w-full px-3 py-2 border-0 outline-none text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <span className="loading loading-spinner loading-xs mr-2"></span>
                                    Loading...
                                </span>
                            ) : (
                                state === 'Login' ? "Sign in" : "Register"
                            )}
                        </button>
                    </div>
                    
                    {state === 'Login' && (
                        <div className="text-sm text-center">
                            <a href="#" className="font-medium text-primary hover:text-primary-focus">
                                Forgot your password?
                            </a>
                        </div>
                    )}
                </form>
                
                <div className="mt-6 text-center text-sm">
                    {state === 'Login' ? (
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                type="button"
                                className="font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                                onClick={() => setState('SignUp')}
                            >
                                Sign up
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button 
                                type="button"
                                className="font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                                onClick={() => setState('Login')}
                            >
                                Sign in
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Authentication
