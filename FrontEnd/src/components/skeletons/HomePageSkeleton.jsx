
import React from 'react'

function HomePageSkeleton() {

    const homePageSkel = Array(7).fill(null);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 my-10 gap-5" >
                {
                    homePageSkel.map((_, i) => (
                        <div key={i} className="flex w-80  flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePageSkeleton
