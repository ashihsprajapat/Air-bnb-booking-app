
import { IndianRupee, MapPin, Calendar } from 'lucide-react';


function LisitngCard({ listing  }) {
    // Function to truncate description to a specific length
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <a href={`/${listing._id}`} className="block transition-transform duration-300 hover:-translate-y-2">
            {/* Card container with improved shadow and hover effects */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Image container with overlay on hover */}
                <div className="relative overflow-hidden">
                    <img 
                        className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" 
                        src={listing.image && listing.image.length >= 1 ? listing.image[0].url : "https://placehold.co/600x400?text=No+Image"} 
                        alt={listing.title || "Listing image"} 
                    />
                    {/* Price badge */}
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4 text-rose-500" />
                        <span className="font-semibold text-gray-800">{listing.price}</span>
                        <span className="text-xs text-gray-500">/night</span>
                    </div>
                </div>
                
                {/* Content container */}
                <div className="p-4 flex-grow flex flex-col">
                    {/* Location with icon */}
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="text-rose-500 w-4 h-4 mr-1" />
                        <span>{listing.location}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{truncateText(listing.description, 100)}</p>
                    
                    {/* Features section */}
                    <div className="mt-auto">
                        {/* Divider */}
                        <div className="border-t border-gray-100 my-3"></div>
                        
                        {/* Booking button */}
                        <button 
                            type="button" 
                            className="w-full mt-2 bg-gradient-to-r from-rose-200 to-rose-400 text-white py-2 px-4 rounded-lg font-medium text-sm hover:from-rose-600 hover:to-rose-700 transition-colors duration-300 flex items-center justify-center"
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            Book this stay
                        </button>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default LisitngCard




