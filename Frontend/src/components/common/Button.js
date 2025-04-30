const Button = ({
    text = "button",
    color,
    textColor = "text-white", // Default text color to white
    padding = "py-2 px-4", // Default padding
    borderRadius = "rounded", // Default border radius
    fontSize = "text-base", // Default font size
    hoverColor = "hover:bg-opacity-80", // Default hover effect
    onClick, // On click handler
    customClasses = "", // Additional custom classes
    image, // extra symbol/image in front of the button
    imageClass,
    border,
}) => {
    return (
        <div
            className={`${textColor} ${padding} ${borderRadius} ${fontSize} ${hoverColor} ${customClasses} w-fit flex items-center justify-center`}
            onClick={onClick}
            style={{
                cursor: "pointer",
                backgroundColor: color, // Apply dynamic background color using inline styles
                border: border,
            }}>
            <p className="leading-normal">{text}</p>
            {image && (
                <img
                    src={image}
                    alt="button-symbol"
                    className={` ${imageClass}`}
                />
            )}
        </div>
    );
};

export default Button;
