import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    Slide,
    IconButton,
    Box,
    Slider,
    Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../common/Button";
import TuneIcon from "@mui/icons-material/Tune";

// Slide transition for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FilterDialog = ({
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
    const [visible, setVisible] = useState(false);

    // Local states for the filters
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);
    const [localDiscountRange, setLocalDiscountRange] = useState(discountRange);
    const [localRatingValue, setLocalRatingValue] = useState(ratingValue);

    // Reset local state to parent values when the dialog is opened
    useEffect(() => {
        if (visible) {
            setLocalPriceRange(priceRange);
            setLocalDiscountRange(discountRange);
            setLocalRatingValue(ratingValue);
        }
    }, [visible, priceRange, discountRange, ratingValue]);

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

    const show = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setIsFilterChange(false); // Trigger the parent component to update the filter
    };

    const handleApply = () => {
        // Update the parent state with the local values
        setPriceRange(localPriceRange);
        setDiscountRange(localDiscountRange);
        setRatingValue(localRatingValue);
        setIsFilterChange(false); // Trigger the parent component to update the filter
        handleClose(); // Close the dialog
    };

    return (
        <div>
            {/* Filter Button */}
            {/* Button to open the sort dialog */}
            <div
                className="flex items-center justify-center bg-[#74B83E] text-white rounded-full px-4 py-2 w-fit"
                onClick={show}>
                <TuneIcon />
                <p>Filter</p>
            </div>

            {/* MUI Dialog */}
            <Dialog
                open={visible}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth
                maxWidth={false} // Prevent size constraints
                PaperProps={{
                    style: {
                        position: "fixed", // Ensure it attaches to the viewport
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: "100%", // Full width
                        maxWidth: "100%", // Full width
                        margin: "0px", // Remove margin
                        borderRadius: "16px 16px 0 0", // Rounded top corners
                    },
                }}>
                {/* Dialog Content */}
                <DialogContent>
                    <div style={{ position: "relative" }}>
                        {/* Close Icon placed at the top right */}
                        <IconButton
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                color: "#74B83E",
                            }}>
                            <CloseIcon fontSize="large" />
                        </IconButton>

                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between w-full">
                                <p className="text-3xl font-semibold text-gray-800 mb-4">
                                    Filter
                                </p>
                            </div>

                            {/* Price Range */}
                            <div>
                                <p className="text-lg font-medium text-gray-700">
                                    Price Range
                                </p>
                                <Box sx={{}}>
                                    <Slider
                                        value={localPriceRange}
                                        onChange={handlePriceRangeChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) =>
                                            `\u20B9${value}`
                                        }
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
                                        valueLabelFormat={(value) =>
                                            `${value}%`
                                        }
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
                                <p className="text-lg font-medium text-gray-700">
                                    Rating
                                </p>
                                <Rating
                                    name="product-rating"
                                    value={localRatingValue}
                                    onChange={handleRatingChange}
                                    precision={0.5}
                                    sx={{
                                        "& .MuiRating-icon": {
                                            color: "#FFD700", // Gold color for stars
                                            fontSize: "2rem", // Increase size beyond "large"
                                        },
                                    }}
                                />
                            </div>

                            {/* Apply Button */}
                            <div className="mx-auto">
                                <Button
                                    text={"Apply"}
                                    color={
                                        isFilterChange ? "#74B83E" : "#E0E0E0"
                                    }
                                    textColor={"text-[white]"}
                                    fontSize={"text-lg"}
                                    padding={"px-4 py-2"}
                                    borderRadius={"rounded-md"}
                                    customClasses={"hover:bg-opacity-80 h-fit"}
                                    onClick={handleApply}
                                    disabled={!isFilterChange} // Disable the button if no filter changes
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FilterDialog;
