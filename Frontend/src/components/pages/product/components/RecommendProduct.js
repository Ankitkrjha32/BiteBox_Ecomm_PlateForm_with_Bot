import SliderTemplate from "../../../common/SliderTemplate";
import ProductCard from "../../../common/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardShimmer from "../../../common/ProductCardShimmer";

const RecommendedProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    const responsive = {
        superLargeDesktop1: {
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
            slidesToSlide: 1,
        },
        superLargeDesktop2: {
            breakpoint: { max: 3000, min: 2000 },
            items: 6,
            slidesToSlide: 1,
        },
        superLargeDesktop3: {
            breakpoint: { max: 2000, min: 1700 },
            items: 5,
            slidesToSlide: 1,
        },
        largeDesktop: {
            breakpoint: { max: 1700, min: 1350 },
            items: 4,
            slidesToSlide: 1,
        },
        desktop: {
            breakpoint: { max: 1350, min: 900 },
            items: 3,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 900, min: 600 },
            items: 3,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    // Fetch Today's Deal products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(
                    `${backendUrl}/api/v1/products/category/Today's Deal`
                );
                setProducts(response.data.products);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.log(error);
                setLoading(true); // Set loading to false in case of error
            }
        };
        fetchProducts();
    }, []);

    return (
        <div
            className="w-full bg-[#ecffe9] flex justify-center select-none"
            id="product">
            <div className="lg:px-20 md:px-4 sm:px-4 w-full">
                {loading ? (
                    // Display shimmer skeleton while loading
                    <div className="mb-32 relative">
                        <p className="text-4xl font-bold text-black mb-2 font-nunito">
                            Recommended Products
                        </p>
                        <SliderTemplate responsive={responsive}>
                            {Array(6)
                                .fill()
                                .map((_, idx) => (
                                    <ProductCardShimmer key={idx} />
                                ))}
                        </SliderTemplate>
                    </div>
                ) : (
                    // Display Today's Deal products when data is loaded
                    <div className="mb-32 relative" id="category-Today's Deal">
                        <p className="text-2xl md:text-4xl font-bold text-black mb-2 font-nunito px-4">
                            Recommended Products
                        </p>
                        <SliderTemplate responsive={responsive}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                />
                            ))}
                        </SliderTemplate>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendedProduct;
