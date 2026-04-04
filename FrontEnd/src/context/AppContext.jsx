import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext("");


export const AppContextProvider = (props) => {

    const navigate = useNavigate("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [listings, setListings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const [menuBarShow, setMenuBarShow] = useState(false);


    const [isHomePageLoading, setHomePageLoading] = useState(false);

    const [isLisingLoading, setIsListingLoading] = useState(false);

    const [userToken, setUserToken] = useState(null);

    const [userData, setUserData] = useState(null);

    const [logoutFormShow, setLogoutFormShow] = useState(false)

    const [listing, setListing] = useState(null);

    const [editListing, setEditListing] = useState(null);
    const [Onelisting, setOneListing] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [reviewSubLoading, setReviewSubLoading] = useState(false);

    const [allReview, setAllReviews] = useState([])

    //fetching all listing 
    const allData = async () => {
        setHomePageLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/listing/`)
            console.log( "All Data in context api ",data)
            setListings(data.reverse())
        } catch (err) {
            console.log(err)
        } finally {
            setHomePageLoading(false);
        }
    }

    //filtering listing 
    const filteredListings = listings.filter(listing => {
        const matchesSearch = searchQuery === '' ||
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeCategory === 'All' ||
            listing.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    //for login and signup state handling
    const [state, setState] = useState('Login');

    useEffect(() => {
        if(userData)
            return 
        const getToken = localStorage.getItem('air_bnb_token')

        if ( !userData &&  getToken) {
            setUserToken(getToken);
        }

    }, [userToken, setUserToken])

    // get user data 
    const getUserdata = async () => {

        try {
            if(userData || !userToken)
                return 

            const { data } = await axios.get(`${backendUrl}/auth/getData`, { headers: { token: userToken } })

            console.log("user data is", data);
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }

        } catch (err) {
            toast.error(err.message);
        }

    }

    //getting the data of one listing 
    const GetListingData = async (id) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/listing/${id}`)
            if (data.success) {
                console.log(data.listing)
                setOneListing(data.listing);
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
    console.log("listing in context api for home page ", listing)

    useEffect(() => {
        if (userToken) {
            getUserdata()
        } else {
            setUserData(null);
        }
    }, [userToken, setUserToken])

    useEffect(() => {
        setMenuBarShow(false)
    }, [setState, navigate, setUserToken, setUserData, userToken])

    const value = {
        navigate, backendUrl, userData, setUserData,
        menuBarShow, setMenuBarShow,
        state, setState,
        userToken, setUserToken,
        isLoading, setIsLoading,
        isHomePageLoading, setHomePageLoading,
        isLisingLoading, setIsListingLoading,
        logoutFormShow, setLogoutFormShow,
        listing, setListing,
        editListing, setEditListing,
        allData, filteredListings,
        listings, setListings,
        searchQuery, setSearchQuery,
        activeCategory, setActiveCategory,
        Onelisting, setOneListing,
        currentImage, setCurrentImage,
        currentImageIndex, setCurrentImageIndex,
        isFavorite, setIsFavorite,
        price, setPrice,
        rating, setRating,
        comment, setComment,
        reviewSubLoading, setReviewSubLoading,
        allReview, setAllReviews,
        GetListingData

    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContext;