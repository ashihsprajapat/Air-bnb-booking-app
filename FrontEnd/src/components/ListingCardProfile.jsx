
import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, Calendar, Eye, Edit, ArrowRight } from 'lucide-react';

function ListingCardProfile({ userData, listing }) {
    const { navigate } = useContext(AppContext);
    
    const handleViewListing = () => {
        navigate(`/profile/${userData._id}/${listing._id}`);
    };
    
    const handleEditListing = (e) => {
        e.stopPropagation();
        navigate(`/${listing._id}/edit`);
    };
    
    const handleViewPublic = (e) => {
        e.stopPropagation();
        window.open(`/${listing._id}`, '_blank');
    };
    
    return (
        <div 
            onClick={handleViewListing}
            className='border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden cursor-pointer'
        >
            <div className='flex flex-col md:flex-row'>
                {/* Image */}
                <div className='md:w-1/4 h-48 md:h-auto relative'>
                    {listing.image && listing.image.length > 0 ? (
                        <img 
                            src={listing.image[0].url} 
                            alt={listing.title} 
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                            <span className='text-gray-400'>No image</span>
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className='flex-1 p-4 flex flex-col'>
                    <div className='flex justify-between items-start mb-2'>
                        <h2 className='text-xl font-semibold text-gray-800 line-clamp-1'>{listing.title}</h2>
                        <div className='flex items-center gap-1 text-rose-500 font-semibold'>
                            <IndianRupee className='w-4 h-4' />
                            <span>{listing.price}</span>
                            <span className='text-gray-500 text-sm'>/night</span>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-1 text-gray-500 mb-2'>
                        <MapPin className='w-4 h-4' />
                        <span className='text-sm'>{listing.location || 'Location not specified'}</span>
                    </div>
                    
                    <p className='text-gray-600 mb-4 line-clamp-2'>
                        {listing.description || 'No description provided'}
                    </p>
                    
                    <div className='mt-auto flex flex-wrap gap-3 text-sm'>
                        <div className='flex items-center gap-1 text-gray-500'>
                            <Calendar className='w-4 h-4' />
                            <span>{listing.availability ? 'Available' : 'Unavailable'}</span>
                        </div>
                        
                        <div className='flex items-center gap-1 text-gray-500'>
                            <Eye className='w-4 h-4' />
                            <span>{listing.views || 0} views</span>
                        </div>
                    </div>
                    
                    <div className='flex justify-between items-center mt-4 pt-3 border-t border-gray-100'>
                        <div className='flex gap-2'>
                            <button 
                                onClick={handleEditListing} 
                                className='flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                            >
                                <Edit className='w-3.5 h-3.5' />
                                Edit
                            </button>
                            <button 
                                onClick={handleViewPublic} 
                                className='flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
                            >
                                <Eye className='w-3.5 h-3.5' />
                                View Public
                            </button>
                        </div>
                        
                        <button 
                            onClick={handleViewListing}
                            className='flex items-center gap-1 text-rose-500 hover:text-rose-600 transition-colors'
                        >
                            <span>Details</span>
                            <ArrowRight className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingCardProfile
