


import  { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function EditListing() {

    const { axios, backendUrl ,editListing,setEditListing} = useContext(AppContext)
    const { id } = useParams()

    useEffect(() => {
        getListingDetailas()
    }, [])

    const getListingDetailas = async () => {
        try {
           // console.log("get all listing details triger")

            const { data } = await axios.get(`${backendUrl}/listing/${id}`);

           // console.log("Fetch listing detilas", data)
           // console.log("api call")

        } catch (err) {
            toast.error(err.message)
        }
    }

  //  console.log("Edit Listing is ", editListing)


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Listing</h1>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={editListing.title || ''}
                            onChange={(e) => setEditListing({ ...editListing, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="Enter listing title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            value={editListing.description || ''}
                            onChange={(e) => setEditListing({ ...editListing, description: e.target.value })}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                            placeholder="Describe your listing"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                value={editListing.category || ''}
                                onChange={(e) => setEditListing({ ...editListing, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="e.g. Apartment, Villa"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Guest Type</label>
                            <input
                                type="text"
                                value={editListing.guestType || ''}
                                onChange={(e) => setEditListing({ ...editListing, guestType: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="e.g. Family, Solo"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={editListing.location || ''}
                            onChange={(e) => setEditListing({ ...editListing, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="City, Country"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price per night ($)</label>
                            <input
                                type="number"
                                value={editListing.price || ''}
                                onChange={(e) => setEditListing({ ...editListing, price: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="0"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Available Date</label>
                            <input
                                type="date"
                                value={editListing.date ? new Date(editListing.date).toISOString().split('T')[0] : ''}
                                onChange={(e) => setEditListing({ ...editListing, date: new Date(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={() => {/* handle save */}}
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditListing
