import SliderTemplate from "../../../common/SliderTemplate";
import Button from "../../../common/Button";
import rightArrow from "../../../../utils/images/product/right-arrow.svg";
import ProductCard from "../../../common/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCardShimmer from "../../../common/ProductCardShimmer";
import { Link } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    const categories = [
        "Today's Deal",
        "Offers",
        "Top Rated",
        "Vegetables",
        "Fruits",
        "Snacks",
    ];

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

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const backendUrl = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(
                    `${backendUrl}/api/v1/products/structured`
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
            className="w-full bg-[#ecffe9] flex justify-center pt-24 select-none"
            id="product">
            <div className="lg:px-20 md: sm: px-4 w-full">
                {loading
                    ? // Display shimmer skeleton while loading
                      categories.map((category, index) => (
                          <div key={index} className="mb-32 relative">
                              <p className="text-4xl font-bold text-black mb-2 font-nunito">
                                  {category}
                              </p>
                              <SliderTemplate responsive={responsive}>
                                  {Array(6)
                                      .fill()
                                      .map((_, idx) => (
                                          <ProductCardShimmer key={idx} />
                                      ))}
                              </SliderTemplate>
                              <Button
                                  text="Explore More"
                                  color={"#F5FBF4"}
                                  textColor={"text-[#74B83E]"}
                                  fontSize="text-2xl"
                                  border={"1px solid"}
                                  image={rightArrow}
                                  customClasses="absolute right-0 font-poppins"
                                  imageClass={"h-6 w-6 ml-2"}
                              />
                          </div>
                      ))
                    : // Display actual product cards when data is loaded
                      categories.map((category) => (
                          <div
                              key={category}
                              className="mb-32 relative"
                              id={`category-${category}`}>
                              <p className="text-4xl font-bold text-black mb-2 font-nunito">
                                  {category}
                              </p>
                              <SliderTemplate responsive={responsive}>
                                  {products[category]?.map((product) => (
                                      <ProductCard
                                          key={product.productId}
                                          product={product}
                                      />
                                  ))}
                              </SliderTemplate>
                              <Link to={`/category/${category}`} key={category}>
                                  <Button
                                      text="Explore More"
                                      color={"#F5FBF4"}
                                      textColor={"text-[#74B83E]"}
                                      fontSize="text-2xl"
                                      border={"1px solid"}
                                      image={rightArrow}
                                      customClasses="absolute right-0 font-poppins"
                                      imageClass={"h-6 w-6 ml-2"}
                                  />
                              </Link>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Product;
