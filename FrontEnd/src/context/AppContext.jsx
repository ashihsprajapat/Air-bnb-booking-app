import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext("");


export const AppContextProvider = (props) => {

    const navigate = useNavigate("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [menuBarShow, setMenuBarShow] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [isHomePageLoading, setHomePageLoading] = useState(false);

    const [isLisingLoading, setIsListingLoading] = useState(false);

    const [userToken, setUserToken] = useState(null);

    const [userData, setUserData] = useState(null);

    const [logoutFormShow, setLogoutFormShow] = useState(false)

    const [listing, setListing] = useState(null);

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
        listing, setListing
    }

    return (
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContext;