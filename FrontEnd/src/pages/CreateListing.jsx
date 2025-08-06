import React, { useContext, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import BroadcastOnPersonalIcon from '@mui/icons-material/BroadcastOnPersonal';
import BusinessIcon from '@mui/icons-material/Business';
import CottageIcon from '@mui/icons-material/Cottage';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import SailingIcon from '@mui/icons-material/Sailing';
import GiteIcon from '@mui/icons-material/Gite';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CastleIcon from '@mui/icons-material/Castle';
import FortIcon from '@mui/icons-material/Fort';
import BalconyIcon from '@mui/icons-material/Balcony';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import AppContext from '../context/AppContext';
import axios from 'axios';
import { ArrowLeft, ArrowRight, Check, Home, MapPin, Upload, Image, PenSquare, IndianRupee } from 'lucide-react';

function CreateListing() {
    const { backendUrl, userToken, navigate, isLisingLoading, setIsListingLoading } = useContext(AppContext);

    const [currentState, setCurrentState] = useState(1);
    const [guestType, setGuestType] = useState(null);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [location, setLocation] = useState(null);

    const [isLoading, setIsLoading] = useState(false)

    // Handle category selection
    const handleCategory = (e) => {
        setCategory(e.target.textContent);
    }

    // Address state
    const [address, setAddress] = useState({
        country: null,
        float: null,
        streetAddress: null,
        NearByLandMark: null,
        District: null,
        city: null,
        state: null,
        pinConde: null,
    })
    // console.log(address)
    //handle of addres
    const handleAddress = (e) => {
        e.preventDefault();
        setAddress(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const [image, setImage] = useState([]);


    const [description, setDescription] = useState("");

    const [price, setPrice] = useState(0);


    const onClickeNextHandle = async (e) => {
        e.preventDefault();
        if (currentState === 2 && category === null) {
            toast("select catagry")
            return
        }

        else if (currentState === 4 && (location === null)) {
            toast("please enter your location")
            return
        }

        else if (currentState === 5 && (address.country === null || address.city === null || address.address === null || address.state === null || address.District === null)) {
            toast("fill all address")
            return
        }
        else if (currentState === 6 && (image.length < 1)) {
            toast("you need to post a photo")
            return
        }
        else if (currentState === 7 && (description === null || description === "")) {
            toast("fill description")
            return
        }
        else if (currentState === 9) {

            try {
                setIsLoading(true)
                const formData = new FormData();
                formData.append('title', title)
                // formData.append('image', image)
                formData.append('description', description)
                formData.append('location', location)
                formData.append('guestType', guestType)
                formData.append('category', category)
                formData.append('address', address)
                formData.append('price', price)
                image.forEach((file, index) => {
                    formData.append("image", file);  // 'image' is the name in the backend (multer expects "image" as the field name)
                });

                const { data } = await axios.post(`${backendUrl}/listing/create`,
                    // title,image, description, address,guestType, category,location

                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: userToken
                    }
                })

                console.log(data);
                setIsLoading(false)

                if (data.success) {
                    toast.success(data.message);

                    navigate("/")
                } else {
                    toast.error(data.message)
                }

            } catch (err) {
                toast.error(err.message)
            }



        }

        setCurrentState(Math.min(9, currentState + 1))

    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <form action="" encType="multipart/form-data" className='w-full max-w-5xl mx-auto'>
                {/* Progress bar */}
                <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-medium">Create your listing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-64 bg-gray-200 rounded-full h-2.5">
                                <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${(currentState / 9) * 100}%` }}></div>
                            </div>
                            <span className="text-sm font-medium">{currentState}/9</span>
                        </div>
                    </div>
                </div>
                <>
                    {
                        currentState === 1 &&
                        <div className='max-w-2xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-8'>What type of place will guests have</h1>
                            <div className='flex flex-col gap-4'>
                                <div
                                    className={`flex items-start gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${guestType === "An entire place" ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"} `}
                                    onClick={() => setGuestType("An entire place")}
                                >
                                    <div className="p-3 bg-rose-100 rounded-full text-rose-600">
                                        <Home className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-medium mb-1'>An entire place</h2>
                                        <p className='text-gray-500'>Guest have the whole place to themselves</p>
                                    </div>
                                    {guestType === "An entire place" && (
                                        <div className="ml-auto">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`flex items-start gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${guestType === "A room" ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"} `}
                                    onClick={() => setGuestType("A room")}
                                >
                                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                        <DoorBackIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-medium mb-1'>A room</h2>
                                        <p className='text-gray-500'>Guest have their own room in a home, plus access to shared spaces</p>
                                    </div>
                                    {guestType === "A room" && (
                                        <div className="ml-auto">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`flex items-start gap-4 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${guestType === "A shared room in a hostel" ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"} `}
                                    onClick={() => setGuestType("A shared room in a hostel")}
                                >
                                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                                        <BroadcastOnPersonalIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-medium mb-1'>A shared room in a hostel</h2>
                                        <p className='text-gray-500'>Guest sleep in a professionally managed hostel with staff on site 24/7</p>
                                    </div>
                                    {guestType === "A shared room in a hostel" && (
                                        <div className="ml-auto">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* currentState === 2 for categrouy */}
                <>
                    {
                        currentState === 2 &&
                        <div className='max-w-6xl mx-auto px-6 py-12'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Which of these best describes your place?</h1>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'House' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>House</h3>
                                    </div>
                                    <div className={`text-${category === 'House' ? "rose" : "gray"}-600`}>
                                        <HomeIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'House' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Flat/apartment' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Flat/apartment</h3>
                                    </div>
                                    <div className={`text-${category === 'Flat/apartment' ? "rose" : "gray"}-600`}>
                                        <BusinessIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Flat/apartment' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Barn' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Barn</h3>
                                    </div>
                                    <div className={`text-${category === 'Barn' ? "rose" : "gray"}-600`}>
                                        <CottageIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Barn' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Bed & breakfast' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Bed & breakfast</h3>
                                    </div>
                                    <div className={`text-${category === 'Bed & breakfast' ? "rose" : "gray"}-600`}>
                                        <RamenDiningIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Bed & breakfast' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Boat' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Boat</h3>
                                    </div>
                                    <div className={`text-${category === 'Boat' ? "rose" : "gray"}-600`}>
                                        <SailingIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Boat' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Cabin' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Cabin</h3>
                                    </div>
                                    <div className={`text-${category === 'Cabin' ? "rose" : "gray"}-600`}>
                                        <GiteIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Cabin' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Campervan/motorhome' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Campervan/motorhome</h3>
                                    </div>
                                    <div className={`text-${category === 'Campervan/motorhome' ? "rose" : "gray"}-600`}>
                                        <AirportShuttleIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Campervan/motorhome' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Casa particular' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Casa particular</h3>
                                    </div>
                                    <div className={`text-${category === 'Casa particular' ? "rose" : "gray"}-600`}>
                                        <CastleIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Casa particular' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Castle' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Castle</h3>
                                    </div>
                                    <div className={`text-${category === 'Castle' ? "rose" : "gray"}-600`}>
                                        <FortIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Castle' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-between h-48 transition-all duration-200 hover:shadow-md ${category === 'Cave' ? "border-2 border-rose-500 bg-rose-50" : "border border-gray-300"}`}
                                    onClick={(e) => handleCategory(e)}
                                >
                                    <div className="text-center">
                                        <h3 className='text-lg font-medium mb-2'>Cave</h3>
                                    </div>
                                    <div className={`text-${category === 'Cave' ? "rose" : "gray"}-600`}>
                                        <BalconyIcon style={{ fontSize: "3.5rem" }} />
                                    </div>
                                    {category === 'Cave' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-rose-500 text-white p-1 rounded-full">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* currentState === 3 for title */}
                <>
                    {
                        currentState === 3 &&
                        <div className='max-w-2xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-10 text-center'>Now, let's give your place a title and price</h1>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8'>
                                <div className='mb-6'>
                                    <label htmlFor="title" className='block text-lg font-medium text-gray-900 mb-2'>Create your title</label>
                                    <p className='text-gray-500 mb-3'>A good title is short, memorable and highlights what makes your place special.</p>
                                    <input
                                        type="text"
                                        id='title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder='e.g. Stunning villa with mountain views'
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                        maxLength={50}
                                    />
                                    <div className='flex justify-end mt-2'>
                                        <span className='text-sm text-gray-500'>{title ? title.length : 0}/50</span>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                                <div>
                                    <label htmlFor="price" className='block text-lg font-medium text-gray-900 mb-2'>Set your price</label>
                                    <p className='text-gray-500 mb-3'>You can change it anytime. Prices shown are per night.</p>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                                            <IndianRupee className='h-5 w-5 text-gray-500' />
                                        </div>
                                        <input
                                            type="number"
                                            id='price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder='0'
                                            className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <div className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                                            <span className='text-gray-700'>Base price</span>
                                            <span className='font-medium'>₹{price || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* currpage==4 location current */}
                <>

                    {
                        currentState === 4 &&
                        <div className='max-w-3xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Where's your place located?</h1>
                            <p className='text-gray-500 text-center mb-10'>Your address is only shared with guests after they've made a reservation.</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-3 bg-rose-100 rounded-full text-rose-600'>
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className='text-xl font-medium'>Location details</h2>
                                </div>

                                <div className='mb-6'>
                                    <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>Enter your location</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                            <LocationOnOutlinedIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id='location'
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder='e.g. Mumbai, India'
                                            className='w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="button" className='flex items-center gap-2 text-rose-600 font-medium'>
                                        <NearMeOutlinedIcon className="h-5 w-5" />
                                        Use my current location
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* currentState ==5 address  */}
                <>
                    {
                        currentState === 5 &&
                        <div className='max-w-3xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Confirm your address</h1>
                            <p className='text-gray-500 text-center mb-10'>Your address is only shared with guests after they've made a reservation</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-3 bg-blue-100 rounded-full text-blue-600'>
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className='text-xl font-medium'>Address details</h2>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='md:col-span-2'>
                                        <label htmlFor="country" className='block text-sm font-medium text-gray-700 mb-1'>Country/region*</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='country'
                                            placeholder='Country/region'
                                            name='country'
                                            value={address.country}
                                            required
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="float" className='block text-sm font-medium text-gray-700 mb-1'>Float, house, etc. (if applicable)</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='float'
                                            placeholder='Float, house, etc.'
                                            name="float"
                                            value={address.float}
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="streetAddress" className='block text-sm font-medium text-gray-700 mb-1'>Street address</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='streetAddress'
                                            placeholder='Street address'
                                            name='streetAddress'
                                            value={address.streetAddress}
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="NearByLandMark" className='block text-sm font-medium text-gray-700 mb-1'>Nearby landmark (if applicable)</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='NearByLandMark'
                                            placeholder='Nearby landmark'
                                            name='NearByLandMark'
                                            value={address.NearByLandMark}
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="District" className='block text-sm font-medium text-gray-700 mb-1'>District/locality*</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='District'
                                            placeholder='District/locality'
                                            name='District'
                                            required
                                            value={address.District}
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className='block text-sm font-medium text-gray-700 mb-1'>City/town*</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='city'
                                            placeholder='City/town'
                                            value={address.city}
                                            name='city'
                                            required
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className='block text-sm font-medium text-gray-700 mb-1'>State/union territory*</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='state'
                                            placeholder='State/union territory'
                                            value={address.state}
                                            name='state'
                                            required
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="pinConde" className='block text-sm font-medium text-gray-700 mb-1'>PIN code</label>
                                        <input
                                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all'
                                            type="text"
                                            id='pinConde'
                                            placeholder='PIN code'
                                            value={address.pinConde}
                                            name='pinConde'
                                            onChange={(e) => handleAddress(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>


                {/* currentState===6 add one photes */}
                <>
                    {
                        currentState === 6 &&
                        <div className='max-w-3xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Add photos of your place</h1>
                            <p className='text-gray-500 text-center mb-10'>You'll need some photos to get started. You can add more or make changes later.</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-3 bg-purple-100 rounded-full text-purple-600'>
                                        <Image className="w-6 h-6" />
                                    </div>
                                    <h2 className='text-xl font-medium'>Upload photos</h2>
                                </div>

                                <div className='mb-8'>
                                    <label
                                        htmlFor="image"
                                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${image.length > 0 ? 'border-rose-300 bg-rose-50' : 'border-gray-300'}`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB per image)</p>
                                        </div>
                                        <input
                                            id="image"
                                            name='image'
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setImage(prevImage => ([...prevImage, e.target.files[0]]))}
                                        />
                                    </label>
                                </div>

                                {image.length > 0 && (
                                    <div>
                                        <h3 className='text-lg font-medium mb-4'>Uploaded photos ({image.length}/8)</h3>
                                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                            {image.map((img, index) => (
                                                <div key={index} className='relative group'>
                                                    <img
                                                        src={URL.createObjectURL(img)}
                                                        alt={`Preview ${index}`}
                                                        className='w-full h-32 object-cover rounded-lg'
                                                    />
                                                    <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center'>
                                                        <button
                                                            type='button'
                                                            onClick={() => setImage(image.filter((_, i) => i !== index))}
                                                            className='bg-white text-red-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition-all'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {image.length < 8 && (
                                                <label htmlFor="image-add" className='border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50'>
                                                    <Upload className="w-6 h-6 mb-2 text-gray-400" />
                                                    <span className="text-sm text-gray-500">Add more</span>
                                                    <input
                                                        id="image-add"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => setImage(prevImage => ([...prevImage, e.target.files[0]]))}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </>

                {/* currentState ===7 description */}
                <>
                    {
                        currentState === 7 &&
                        <div className='max-w-3xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Create your description</h1>
                            <p className='text-gray-500 text-center mb-10'>Share what makes your place special.</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-3 bg-purple-100 rounded-full text-purple-600'>
                                        <PenSquare className="w-6 h-6" />
                                    </div>
                                    <h2 className='text-xl font-medium'>Write a description</h2>
                                </div>

                                <div className='mb-2'>
                                    <textarea
                                        className='w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                                        placeholder="You'll have a great time at this comfortable place to stay"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='flex justify-between text-sm text-gray-500'>
                                    <p>Be descriptive and highlight unique features</p>
                                    <p>{description.length} characters</p>
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* check review currentState ===8 */}
                <>
                    {
                        currentState === 8 &&
                        <div className='max-w-4xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Review your listing</h1>
                            <p className='text-gray-500 text-center mb-10'>Make sure everything looks good before publishing.</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8'>
                                <div className='flex items-center gap-3 mb-6'>
                                    <div className='p-3 bg-purple-100 rounded-full text-purple-600'>
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h2 className='text-xl font-medium'>Listing details</h2>
                                </div>

                                <div className='grid md:grid-cols-2 gap-8'>
                                    <div>
                                        <div className='mb-6'>
                                            <h3 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h3>
                                            <div className='flex flex-wrap gap-2 mb-4'>
                                                <span className='bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium'>{guestType}</span>
                                                <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>{category}</span>
                                                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>{location}</span>
                                            </div>
                                        </div>

                                        <div className='mb-6'>
                                            <h4 className='font-medium text-gray-700 mb-2'>Description</h4>
                                            <p className='text-gray-600 bg-gray-50 p-4 rounded-lg'>{description || 'No description provided'}</p>
                                        </div>

                                        <div>
                                            <h4 className='font-medium text-gray-700 mb-2'>Address</h4>
                                            <div className='bg-gray-50 p-4 rounded-lg'>
                                                <div className='grid grid-cols-2 gap-2'>
                                                    <div>
                                                        <p className='text-sm text-gray-500'>Country</p>
                                                        <p className='font-medium'>{address.country || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-sm text-gray-500'>State</p>
                                                        <p className='font-medium'>{address.state || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-sm text-gray-500'>District</p>
                                                        <p className='font-medium'>{address.District || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-sm text-gray-500'>City</p>
                                                        <p className='font-medium'>{address.city || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-sm text-gray-500'>PIN Code</p>
                                                        <p className='font-medium'>{address.pinConde || 'Not specified'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className='font-medium text-gray-700 mb-3'>Photos ({image.length})</h4>
                                        {image.length > 0 ? (
                                            <div className='grid grid-cols-2 gap-3'>
                                                {image.map((img, i) => (
                                                    <div key={i} className='rounded-lg overflow-hidden border border-gray-200 aspect-square'>
                                                        <img
                                                            className='w-full h-full object-cover'
                                                            src={URL.createObjectURL(img)}
                                                            alt={`Listing image ${i + 1}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className='bg-gray-50 p-4 rounded-lg text-center text-gray-500'>
                                                No images uploaded
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* currentState ===9 finish and publish */}
                <>
                    {
                        currentState === 9 &&
                        <div className='max-w-4xl mx-auto px-6 py-16'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Ready to publish your listing</h1>
                            <p className='text-gray-500 text-center mb-10'>You're almost there! Review everything one last time before publishing.</p>

                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                                <div className='grid md:grid-cols-2'>
                                    <div className='p-8'>
                                        <div className='flex items-center gap-3 mb-6'>
                                            <div className='p-3 bg-purple-100 rounded-full text-purple-600'>
                                                <Check className="w-6 h-6" />
                                            </div>
                                            <h2 className='text-xl font-medium'>Finish up and publish</h2>
                                        </div>

                                        <p className='text-gray-600 mb-6'>Your listing is ready to go live! Once published, guests will be able to book your place based on your availability settings.</p>

                                        <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
                                            <h3 className='font-medium text-green-800 mb-2'>What happens next?</h3>
                                            <ul className='text-green-700 text-sm space-y-2'>
                                                <li className='flex items-start gap-2'>
                                                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    <span>Your listing will be reviewed by our team</span>
                                                </li>
                                                <li className='flex items-start gap-2'>
                                                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    <span>Once approved, it will appear in search results</span>
                                                </li>
                                                <li className='flex items-start gap-2'>
                                                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    <span>You can edit your listing anytime from your dashboard</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <p className='text-sm text-gray-500'>By publishing, you agree to our Terms of Service and Privacy Policy.</p>
                                    </div>

                                    <div className='bg-gray-50 flex items-center justify-center p-8'>
                                        <img
                                            src="https://www.buyrentkenya.com/discover/wp-content/uploads/2022/06/brk-blog-4reasons-why.png"
                                            alt="Listing success"
                                            className='max-w-full rounded-lg shadow-md'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>

                {/* button for next and back */}
                <div className='max-w-4xl mx-auto px-6 flex items-center justify-between py-8 border-t border-gray-200 mt-8'>
                    {currentState >= 2 ? (
                        <button
                            className='flex items-center gap-2 px-5 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors'
                            onClick={() => setCurrentState(currentState - 1)}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                    ) : (
                        <div></div> /* Empty div to maintain flex spacing when back button is hidden */
                    )}

                    <div className='flex items-center gap-2'>
                        <div className='hidden md:flex items-center'>
                            <div className='text-xs text-gray-500 mr-3'>Step {currentState} of 9</div>
                            <div className='w-32 h-2 bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-purple-600 rounded-full'
                                    style={{ width: `${(currentState / 9) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <button
                        disabled={isLoading ? true : false}
                            className={`px-6 py-3 text-base font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-2 `}
                            onClick={(e) => onClickeNextHandle(e)}
                        >
                            {currentState === 9 ? "Publish listing" : "Next"}
                            {currentState !== 9 && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>


            </form>
        </div>
    )
}

export default CreateListing
