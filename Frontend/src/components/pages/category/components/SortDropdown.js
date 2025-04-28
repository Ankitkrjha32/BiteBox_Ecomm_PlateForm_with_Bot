import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

const SortDropdown = ({ isSortChange, sortBy, setIsSortChange, setSortBy }) => {

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort"
                onChange={handleChange}
                size="small"
                style={{ minWidth: 100 }}
                MenuProps={{
                    disableScrollLock: true, // Prevent scrollbar removal
                }}>
                <MenuItem value="Featured">Featured</MenuItem>
                <MenuItem value="Price: High to Low">
                    Price: High to Low
                </MenuItem>
                <MenuItem value="Price: Low to High">
                    Price: Low to High
                </MenuItem>
                <MenuItem value="Discount: High to Low">
                    Discount: High to Low
                </MenuItem>
                <MenuItem value="Discount: Low to High">
                    Discount: Low to High
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortDropdown;
