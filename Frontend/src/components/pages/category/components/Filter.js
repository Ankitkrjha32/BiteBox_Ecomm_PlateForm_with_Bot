import React from "react";
import { Slider } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import Button from "../../../common/Button";
import { useState } from "react";

const Filter = ({
    priceRange,
    setPriceRange,
    discountRange,
    setDiscountRange,
    ratingValue,
    setRatingValue,
    // isLargeScreen,
    isFilterChange,
    setIsFilterChange,
}) => {
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);
    const [localDiscountRange, setLocalDiscountRange] = useState(discountRange);
    const [localRatingValue, setLocalRatingValue] = useState(ratingValue);

    const handlePriceRangeChange = (event, newValue) => {
        setLocalPriceRange(newValue);
        setIsFilterChange(true);
    };

    const handleDiscountRangeChange = (event, newValue) => {
        setLocalDiscountRange(newValue);
        setIsFilterChange(true);
    };

    const handleRatingChange = (event, newValue) => {
        setLocalRatingValue(newValue);
        setIsFilterChange(true);
    };

    const handleApplyChanges = () => {
        console.log("applied");
        setIsFilterChange(false);
        setPriceRange(localPriceRange);
        setDiscountRange(localDiscountRange);
        setRatingValue(localRatingValue);
    };

    return (
        <div className=" flex flex-1 flex-col  gap-6 ">
            <div className="flex justify-between w-full">
                <p className="text-3xl font-semibold text-gray-800 mb-4">
                    Filter
                </p>
            </div>

            {/* Price Range */}
            <div className="">
                <p className="text-lg font-medium text-gray-700">Price Range</p>
                <Box sx={{}}>
                    <Slider
                        value={localPriceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `\u20B9${value}`}
                        min={0}
                        max={200}
                        disableSwap
                        sx={{
                            "& .MuiSlider-rail": {
                                backgroundColor: "#e0e0e0",
                            },
                            "& .MuiSlider-track": {
                                backgroundColor: "#4CAF50",
                                borderColor: "#4CAF50",
                            },
                            "& .MuiSlider-thumb": {
                                backgroundColor: "#4CAF50",
                            },
                        }}
                    />
                    {/* Display Price Range Values */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <span className="font-medium">
                            {"\u20B9"}
                            {/* rupee symbol */}
                            {localPriceRange[0]}
                        </span>
                        <span className="font-medium">
                            {"\u20B9"}
                            {/* rupee symbol */}
                            {localPriceRange[1]}
                        </span>
                    </Box>
                </Box>
            </div>

            {/* Discount Range */}
            <div>
                <p className="text-lg font-medium text-gray-700">
                    Discount Range
                </p>
                <Box sx={{}}>
                    <Slider
                        value={localDiscountRange}
                        onChange={handleDiscountRangeChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        min={0}
                        max={100}
                        disableSwap
                        sx={{
                            "& .MuiSlider-rail": {
                                backgroundColor: "#e0e0e0",
                            },
                            "& .MuiSlider-track": {
                                backgroundColor: "#FF9800",
                                borderColor: "#FF9800",
                            },
                            "& .MuiSlider-thumb": {
                                backgroundColor: "#FF9800",
                            },
                        }}
                    />
                    {/* Display Discount Range Values */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <span className="font-medium">
                            {localDiscountRange[0]}%
                        </span>
                        <span className="font-medium">
                            {localDiscountRange[1]}%
                        </span>
                    </Box>
                </Box>
            </div>

            {/* Rating */}
            <div>
                <p className="text-lg font-medium text-gray-700">Rating</p>
                <Rating
                    name="product-rating"
                    value={localRatingValue}
                    onChange={handleRatingChange}
                    precision={0.5}
                    size="large"
                    sx={{
                        "& .MuiRating-icon": {
                            color: "#FFD700", // Gold color for stars
                        },
                    }}
                />
            </div>

            {/* Apply Button */}
            <div className="mx-auto">
                {isFilterChange ? (
                    <Button
                        text={"Apply"}
                        color={"#74B83E"}
                        textColor={"text-[white]"}
                        fontSize={"text-lg"}
                        padding={"px-4 py-2"}
                        borderRadius={"rounded-md"}
                        customClasses={"hover:bg-opacity-80 h-fit"}
                        onClick={handleApplyChanges}
                    />
                ) : (
                    <Button
                        text={"Apply"}
                        color={"#E0E0E0"}
                        textColor={"text-[white]"}
                        fontSize={"text-lg"}
                        padding={"px-4 py-2"}
                        borderRadius={"rounded-md"}
                        customClasses={
                            "hover:bg-opacity-80 h-fit cursor-default"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Filter;
