
import   { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import ListingCardProfile from '../components/ListingCardProfile';
import AllListingSckeleton from '../components/skeletons/AllListingSckeleton';
import { Home, Plus, RefreshCw } from 'lucide-react';



function AllListingProfile() {
    const { userData, navigate, backendUrl, userToken } = useContext(AppContext);
    const [allListing, setAllListing]= useState([])
    const { setListings} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true);

    const getAllListings = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${backendUrl}/listing/profile/all-listing`, { headers: { token: userToken } });
            //console.log(" host by user all listing ", data)
            if (data.success) {
                setAllListing(data.Listings.reverse() || []);
            } else {
                toast.error(data.message || 'Failed to fetch listings');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error fetching listings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        getAllListings();
        toast.info('Refreshing listings...');
    };

    useEffect(() => {
        if (userToken) {
            getAllListings();
        }
    }, [userToken]);

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Listings</h1>
                    <p className="text-gray-600">Manage all your property listings</p>
                </div>
                <AllListingSckeleton />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Listings</h1>
                    <p className="text-gray-600">Manage all your property listings</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleRefresh} 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Refresh listings"
                    >
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
            
            {setAllListing && setAllListing.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {allListing.map((listing, i) => (
                        <ListingCardProfile userData={userData} listing={listing} key={i}
                        onClick={()=> setListings(listing)} />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Home className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-6">You haven&apos;t created any listings yet. Start hosting by adding your first property.</p>
                </div>
            )}
            
            <div className="flex justify-center mt-4">
                <button 
                    onClick={() => navigate("/become-a-host")} 
                    className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Listing
                </button>
            </div>
        </div>
    )
}

export default AllListingProfile
