const ProductCardSkeleton = () => {
    return (
        <div>
            <div className="flex pt-20 font-poppins text-lg sm:items-start items-center sm:flex-row flex-col mx-auto">
                <div className="relative sm:mx-0 w-fit sm:w-auto">
                    <div className="h-[22rem] w-[20rem] sm:h-[24rem] sm:w-[22rem] md:h-[28rem] md:w-[25rem] lg:h-[30rem] lg:w-[28rem] border-2 border-gray-300 rounded-md shadow-xl shimmer"></div>
                </div>
                <div className="sm:ml-6 md:ml-10 flex flex-col gap-7 w-fit mt-8 sm:mt-0 md:mt:0">
                    <div className="h-10 w-3/4 bg-gray-300 shimmer rounded-md"></div>
                    <div className="h-6 w-1/3 bg-gray-300 shimmer rounded-md"></div>
                    <div className="h-8 w-1/2 bg-green-300 shimmer rounded-md"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-8 w-2/3 bg-gray-300 shimmer rounded-md"></div>
                        <div className="h-6 w-1/3 bg-gray-300 shimmer rounded-md"></div>
                    </div>
                    <div className="h-6 w-1/2 bg-gray-300 shimmer rounded-md"></div>
                    <div className="h-6 w-1/3 bg-gray-300 shimmer rounded-md"></div>
                    <div className="flex md:items-center gap-4 justify-center flex-col md:flex-row">
                        <div className="flex items-center">
                            <div className="h-10 w-12 bg-gray-300 shimmer rounded-l-md"></div>
                            <div className="h-10 w-16 bg-gray-300 shimmer"></div>
                            <div className="h-10 w-12 bg-gray-300 shimmer rounded-r-md"></div>
                        </div>
                        <div className="h-12 w-48 bg-green-300 shimmer rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-8 md:mt-16 px-6 font-poppins flex md:flow-row flex-col gap-2 items-baseline">
                <div className="h-8 w-1/3 bg-gray-300 shimmer"></div>
                <div className="h-6 w-full sm:w-3/4 md:w-2/3 bg-gray-300 shimmer"></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
