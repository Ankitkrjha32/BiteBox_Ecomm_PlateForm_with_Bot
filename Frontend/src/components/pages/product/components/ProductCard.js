import React, { useState } from "react";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
    // Destructure product details
    const {
        name,
        price,
        category,
        description,
        quantityInStock,
        unit,
        imageurl,
        discount,
        discountedPrice,
        rating,
        isOrganic,
    } = product;

    const [quantity, setQuantity] = useState(1);
    const [isHovering, setIsHovering] = useState(false);
    const [magnifyStyle, setMagnifyStyle] = useState({});

    // Handlers for incrementing and decrementing
    const handleIncrement = () => {
        if (quantity < quantityInStock) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleMouseMove = (e) => {
        setIsHovering(true);
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMagnifyStyle({
            backgroundImage: `url(${imageurl})`,
            backgroundPosition: `${x}% ${y}%`,
        });
    };

    return (
        <div>
            <div className="flex pt-20 font-poppins text-lg sm:items-start items-center sm:flex-row flex-col mx-auto ">
                <div
                    className="relative sm:mx-0 w-fit sm:w-auto"
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}>
                    <img
                        src={imageurl}
                        alt={name}
                        className="h-[22rem] w-[20rem] sm:h-[24rem] sm:w-[22rem] md:h-[28rem] md:w-[25rem] lg:h-[30rem] lg:w-[28rem] border-2 border-gray-300 rounded-md shadow-xl hover:cursor-crosshair"
                    />
                    {isHovering && (
                        <div
                            className="absolute top-0 left-[120%] h-[22rem] w-[20rem] sm:h-[24rem] sm:w-[22rem] md:h-[28rem] md:w-[25rem] lg:h-[30rem] lg:w-[28rem] bg-no-repeat bg-cover border-2 border-gray-300 rounded-md shadow-xl z-10"
                            style={{
                                ...magnifyStyle,
                                backgroundSize: "200%",
                            }}></div>
                    )}
                </div>
                <div className="sm:ml-6 md:ml-10 flex flex-col gap-4 w-fit mt-8 sm:mt-0 md:mt:0">
                    <p className="text-5xl font-semibold lg:text-5xl sm:text-5xl md:text-4xl w-fit md:w-auto max-w-[20rem] md:max-w-fit">
                        {name}
                    </p>
                    <div className="flex items-center w-fit sm:w-auto">
                        <Rating value={rating} size="large" readOnly />
                    </div>
                    <p className="text-green-600 text-xl font-medium lg:text-xl sm:text-xl md:text-lg">
                        You save:{" "}
                        <span className="text-2xl lg:text-2xl sm:text-2xl md:text-xl">
                            {discount}%
                        </span>{" "}
                        OFF
                    </p>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                            <p className="text-[#74B83E] text-4xl font-semibold lg:text-4xl sm:text-4xl md:text-3xl">
                                {"\u20B9"}
                                {discountedPrice}{" "}
                                <span className="text-xl font-medium lg:text-xl sm:text-xl md:text-lg">
                                    per {unit}
                                </span>
                            </p>
                            <p className="line-through text-[#7F7F7F] text-xl lg:text-xl sm:text-xl md:text-lg">
                                M.R.P.:
                                {"\u20B9"}
                                {price}
                            </p>
                        </div>
                    </div>
                    <p className="text-xl lg:text-xl sm:text-xl md:text-lg">
                        Category: {category}
                    </p>
                    <p className="text-xl lg:text-xl sm:text-xl md:text-lg">
                        Quantity in Stock: {quantityInStock} {unit}
                    </p>
                    {isOrganic && (
                        <p className="text-xl lg:text-xl sm:text-xl md:text-lg">
                            Organic: Yes
                        </p>
                    )}
                    <div className="flex md:items-center gap-4 flex-col md:flex-row">
                        <div className="flex items-center">
                            <button
                                className="quantity-btn bg-white border-2 border-gray-300 text-gray-800 w-12 h-10 rounded-l-md flex items-center justify-center text-2xl font-semibold lg:w-12 lg:h-10 lg:text-2xl sm:w-12 sm:h-10 sm:text-2xl md:w-10 md:h-9 md:text-xl hover:bg-green-600 hover:text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}>
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Math.min(
                                                e.target.value,
                                                quantityInStock
                                            )
                                        )
                                    )
                                }
                                className="quantity-display text-2xl font-semibold text-gray-800 w-16 h-10 text-center border-2 border-gray-300 bg-white lg:w-16 lg:h-10 lg:text-2xl sm:w-16 sm:h-10 sm:text-2xl md:w-14 md:h-9 md:text-xl"
                                min="1"
                                max={quantityInStock}
                                disabled={
                                    quantity <= 1 || quantity >= quantityInStock
                                }
                            />
                            <button
                                className="quantity-btn bg-white border-2 border-gray-300 text-gray-800 w-12 h-10 rounded-r-md flex items-center justify-center text-2xl font-semibold lg:w-12 lg:h-10 lg:text-2xl sm:w-12 sm:h-10 sm:text-2xl md:w-10 md:h-9 md:text-xl hover:bg-green-600 hover:text-white disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed transition-all duration-300"
                                onClick={handleIncrement}
                                disabled={quantity >= quantityInStock}>
                                +
                            </button>
                        </div>
                        {/* add to cart button */}
                        <button className="bg-[#74B83E] text-white text-2xl font-semibold h-12 rounded-md hover:bg-[#81cb44] transition-all duration-300 lg:w-48 lg:h-12 lg:text-2xl sm:w-48 sm:h-12 sm:text-2xl md:w-40 md:h-10 md:text-xl w-full">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 md:mt-16 font-poppins flex md:flow-row flex-col gap-2 items-baseline">
                <p className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">
                    Description:
                </p>
                <p className="text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl w-fit">
                    {description}
                </p>
            </div>

            {/* description */}
        </div>
    );
};

export default ProductCard;
