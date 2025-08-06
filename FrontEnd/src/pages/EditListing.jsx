


import React, { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function EditListing() {

    const { axios, backendUrl, userToken } = useContext(AppContext)
    const { id } = useParams()

    useEffect(() => {
        getListingDetailas()
    }, [])

    const getListingDetailas = async () => {
        try {
            console.log("get all listing details triger")

            const { data } = await axios.get(`${backendUrl}/listing/${id}`);

            console.log("Fetch listing detilas", data)
            console.log("api call")

        } catch (err) {
            toast.error(err.message)
        }
    }



    return (
        <div>
            Edit Listing
            <h1>Listing details </h1>
        </div>
    )
}

export default EditListing
