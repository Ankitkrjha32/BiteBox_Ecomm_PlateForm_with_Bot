export const capitalizeWords = (str) => {
    return str
        .split(" ") // Split the string by spaces
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize the first letter
        .join(" "); // Rejoin the words with spaces
};
