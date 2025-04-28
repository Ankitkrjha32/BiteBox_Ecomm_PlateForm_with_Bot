import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../../common/Button";
import { IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

// Slide transition for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SortDialog = ({ isSortChange, sortBy, setIsSortChange, setSortBy }) => {
    const [visible, setVisible] = useState(false);
    const [localSortBy, setLocalSortBy] = useState(sortBy);

    // Define the sort options dynamically
    const sortOptions = [
        { value: "Featured", label: "Featured" },
        { value: "Price: High to Low", label: "Price: High to Low" },
        { value: "Price: Low to High", label: "Price: Low to High" },
        { value: "Discount: High to Low", label: "Discount: High to Low" },
        { value: "Discount: Low to High", label: "Discount: Low to High" },
    ];

    // Reset `localSortBy` to the last applied `sortBy` when the dialog is opened
    useEffect(() => {
        if (visible) {
            setLocalSortBy(sortBy);
        }
    }, [visible, sortBy]);

    // Show the dialog
    const show = () => {
        setVisible(true);
    };

    // Handle radio button change
    const handleRadioChange = (event) => {
        setLocalSortBy(event.target.value);
        setIsSortChange(true); // Trigger the parent component to update the sort filter
    };

    // Close the dialog
    const handleClose = () => {
        setVisible(false);
        setIsSortChange(false); // Trigger the parent component to update the sort filter
    };

    // Apply the selected sort option
    const handleApply = () => {
        setSortBy(localSortBy); // Apply the selected sort option globally
        setIsSortChange(false);
        handleClose();
    };

    return (
        <div>
            {/* Button to open the sort dialog */}
            <div
                className="flex items-center justify-center bg-[#74B83E] text-white rounded-full px-4 py-2 w-fit"
                onClick={show}>
                <SwapVertIcon />
                <p>Sort</p>
            </div>

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
                        margin: 0, // Remove margin
                        padding: "10px",
                        borderRadius: "16px 16px 0 0", // Rounded top corners
                    },
                }}>
                <DialogTitle style={{ position: "relative" }}>
                    <p className="text-3xl font-semibold text-gray-800 mb-4">
                        Sort
                    </p>
                    {/* Close Icon placed at the top right */}
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "#74B83E",
                        }}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="sort"
                            value={localSortBy}
                            onChange={handleRadioChange}
                            name="radio-buttons-group">
                            {sortOptions.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#74B83E",
                                                "&.Mui-checked": {
                                                    color: "#74B83E",
                                                },
                                            }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>

                <div className="mx-auto">
                    <DialogActions>
                        {isSortChange ? (
                            <Button
                                onClick={handleApply}
                                text="Apply"
                                color={"#74B83E"}
                                textColor="text-white"
                                customClasses="rounded-lg"
                            />
                        ) : (
                            <Button
                                text="Apply"
                                color={"#E0E0E0"}
                                textColor="text-white"
                                customClasses="rounded-lg"
                            />
                        )}
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};

export default SortDialog;
