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

    const [isLoading, setIsLoading] = useState(false);

    const [isHomePageLoading, setHomePageLoading] = useState(false);

    const [isLisingLoading, setIsListingLoading] = useState(false);

    const [userToken, setUserToken] = useState(null);

    const [userData, setUserData] = useState(null);

    const [logoutFormShow, setLogoutFormShow] = useState(false)

    const [listing, setListing] = useState(null);

    const [editListing, setEditListing] = useState(null);

    //fetching all listing 
    const allData = async () => {
        setHomePageLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/listing/`)
            //  console.log("all listing are", data)
            setListings(data.Listings.reverse())
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

        const getToken = localStorage.getItem('air_bnb_token')

        if (getToken) {
            setUserToken(getToken);
        }

    }, [userToken, setUserToken])

    // get user data 
    const getUserdata = async () => {

        try {

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
        allData,filteredListings,
        listings, setListings,
        searchQuery, setSearchQuery,
        activeCategory, setActiveCategory

    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContext;