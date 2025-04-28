import { Link } from "react-router-dom";
import plusImage from "../../utils/images/slider/plus.svg";

const ProductCard = ({ product }) => {
    return (
        <div
            key={product.productId}
            className="w-[160px] sm:w-[190px] md:w-[210px] lg:w-[270px] py-2 px-2 my-2 flex flex-col rounded-xl bg-[white] transition-transform duration-150 hover:scale-[1.01] mx-auto shadow-lg mb-6">
            <Link
                to={`/product/${product.productId}`}
                className="gap-2 flex flex-col">
                <img
                    alt={`${product.name} logo`}
                    src={product.imageurl}
                    className="object-contain rounded-md bg-white mx-auto h-[160px] sm:h-[190px] md:h-[210px] lg:h-[270px] w-[180px] sm:w-[190px] md:w-[210px] lg:w-[270px]"
                />
                <div className="flex flex-col gap-2 bg-[#F8F8F8] font-poppins py-1">
                    <p className="font-semibold text-lg text-black text-center overflow-hidden whitespace-nowrap text-ellipsis">
                        {product.name}
                    </p>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-sm md:text-lg line-through text-[#7F7F7F] leading-3">
                            {"\u20B9"} {/* rupee symbol */}
                            {product.price.toFixed(2)}
                        </p>
                        <p className="text-base md:text-2xl text-[#74B83E] leading-3 font-semibold">
                            {"\u20B9"} {/* rupee symbol */}
                            {(



                                product.price -
                                product.price * (product.discount / 100)

                                
                            ).toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-[#74B83E] flex justify-center items-center gap-1 px-5 py-2 rounded-lg text-white text-center mt-2 w-fit mx-auto">
                        <p className="text-xl leading-3">Add</p>
                        <img
                            src={plusImage}
                            alt="plus"
                            className="inline-block h-4 w-4"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
