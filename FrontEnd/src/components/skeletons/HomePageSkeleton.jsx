

function HomePageSkeleton() {

    const homePageSkel = Array(8).fill(null);
    return (
        <div>
            <div className="grid max-w-7xl sm:w-full   mx-auto px-2 items-center  mb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
                {
                    homePageSkel.map((_, i) => (
                        <div key={i} className="flex lg:80  sm:w-full p-2 lg:w-80    flex-col gap-4">
                            <div className="skeleton h-32 "></div>
                            <div className="skeleton h-4"></div>
                            <div className="skeleton h-4 "></div>
                            <div className="skeleton h-4 "></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePageSkeleton
