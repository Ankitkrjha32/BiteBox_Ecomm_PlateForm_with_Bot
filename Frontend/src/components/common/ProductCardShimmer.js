
const ProductCardShimmer = () => {
    return (
        <div
            className="w-[160px] sm:w-[190px] md:w-[210px] lg:w-[270px] py-2 px-2 my-2 flex flex-col rounded-xl bg-[white] shimmer mx-auto">
            <div className="bg-[#E4EDEC] shimmer h-[160px] sm:h-[190px] md:h-[210px] lg:h-[270px] mx-auto rounded-md"></div>
            <div className="flex flex-col gap-2 bg-[#F8F8F8] py-1">
                <div className="h-6 w-3/4 bg-[#E4EDEC] shimmer mx-auto rounded-md"></div>
                <div className="flex justify-center items-center gap-2">
                    <div className="h-4 w-1/3 bg-[#E4EDEC] shimmer rounded-md"></div>
                    <div className="h-6 w-1/4 bg-[#E4EDEC] shimmer rounded-md"></div>
                </div>
                <div className="h-8 w-1/2 bg-[#74B83E] shimmer rounded-md mx-auto mt-4"></div>
            </div>
        </div>
    );
};

export default ProductCardShimmer;
