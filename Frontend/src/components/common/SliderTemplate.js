import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import leftArrowImage from "../../utils/images/slider/left-arrow-slider.svg";
import rightArrowImage from "../../utils/images/slider/right-arrow-slider.svg";

const CustomLeftArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute left-0 z-10 flex justify-center items-center h-fit w-fit"
            style={{ top: "50%", transform: "translateY(-50%)" }}>
            <img src={leftArrowImage} alt="Left Arrow" className="h-10 w-10" />
        </button>
    );
};

const CustomRightArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="absolute right-0 z-10 flex justify-center items-center h-fit w-fit"
            style={{ top: "50%", transform: "translateY(-50%)" }}>
            <img
                src={rightArrowImage}
                alt="Right Arrow"
                className="h-10 w-10"
            />
        </button>
    );
};

const SliderTemplate = ({ children, responsive }) => {
    return (
        <div className="carousel-container mx-auto">
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                pauseOnHover={false}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                arrows>
                {children}
            </Carousel>
        </div>
    );
};

export default SliderTemplate;
