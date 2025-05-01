import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { capitalizeWords } from "../helper/capitalizeWords.js";
import { chatbotCall } from "../helper/chatbotCall.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        return res.status(200).json({
            message: "List of all products",
            products: products,
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.find({
            productId: productId,
        });
        return res.status(200).json({
            message: "Product found",
            product: product,
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({
            message: "Product created successfully",
            product: product,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message,
        });
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const category = capitalizeWords(req.params.category);
        const { priceMin, priceMax, discountMin, discountMax, rating, sortBy } =
            req.query;

        // Construct query filters
        let filterQuery = {};

        if (priceMin && priceMax) {
            filterQuery.discountedPrice = {
                $gte: Number(priceMin),
                $lte: Number(priceMax),
            };
        }
        if (discountMin && discountMax) {
            filterQuery.discount = {
                $gte: Number(discountMin),
                $lte: Number(discountMax),
            };
        }
        if (rating) {
            filterQuery.rating = { $gte: Number(rating) };
        }

        const getSortOptions = (sortBy) => {
            switch (sortBy) {
                case "Price: High to Low":
                    return { discountedPrice: -1 };
                case "Price: Low to High":
                    return { discountedPrice: 1 };
                case "Discount: High to Low":
                    return { discount: -1 };
                case "Discount: Low to High":
                    return { discount: 1 };
                case "Featured":
                default:
                    return null;
            }
        };

        const specialCategories = {
            "Today's Deal": async () =>
                await Product.aggregate([{ $sample: { size: 30 } }]),
            "Top Rated": async () =>
                await Product.find({ rating: { $gt: 3.5 } }).lean(),
            Offers: async () =>
                await Product.find({ discount: { $gt: 0.19 } }).lean(),
        };

        let products;

        // Check if the category is a special category
        if (specialCategories[category]) {
            products = await specialCategories[category]();

            // Normalize structure if data doesn't have lean applied
            if (!products[0]._id) {
                products = products.map((product) => ({
                    ...product._doc,
                    discountedPrice:
                        product.discountedPrice || product.price || 0,
                    discount: product.discount || 0,
                    rating: product.rating || 0,
                }));
            }

            // Apply filters
            products = products.filter((product) => {
                const satisfiesPrice =
                    !filterQuery.discountedPrice ||
                    (product.discountedPrice >=
                        filterQuery.discountedPrice.$gte &&
                        product.discountedPrice <=
                            filterQuery.discountedPrice.$lte);
                const satisfiesDiscount =
                    !filterQuery.discount ||
                    (product.discount >= filterQuery.discount.$gte &&
                        product.discount <= filterQuery.discount.$lte);
                const satisfiesRating =
                    !filterQuery.rating ||
                    product.rating >= filterQuery.rating.$gte;
                return satisfiesPrice && satisfiesDiscount && satisfiesRating;
            });

            // Apply sorting
            const sortOptions = getSortOptions(sortBy);
            if (sortOptions) {
                const [key, order] = Object.entries(sortOptions)[0];
                products.sort((a, b) => (a[key] > b[key] ? order : -order));
            }
        } else {
            filterQuery.category = category;
            products = await Product.find(filterQuery).lean();

            // Apply sorting if applicable
            const sortOptions = getSortOptions(sortBy);
            if (sortOptions) {
                products = await Product.find(filterQuery)
                    .sort(sortOptions)
                    .lean();
            }
        }

        // Return the products found
        if (products.length > 0) {
            return res.status(200).json({
                message: `List of products in category '${category}'`,
                products,
                status: 200,
            });
        }

        return res.status(204).json({
            message: `No products found in category '${category}'`,
            status: 204,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message,
        });
    }
};

const getAllProductsStructuredByCategory = async (req, res) => {
    try {
        const products = await Product.find({});
        const topRated = await Product.find({ rating: { $gt: 4.7 } });
        const topOffer = await Product.find({ discount: { $gt: 0.3 } });
        const todaysDeal = await Product.aggregate([{ $sample: { size: 30 } }]);
        let structuredProducts = {};
        products.forEach((product) => {
            if (structuredProducts[product.category]) {
                structuredProducts[product.category].push(product);
            } else {
                structuredProducts[product.category] = [product];
            }
        });
        structuredProducts["Top Rated"] = topRated;
        structuredProducts["Offers"] = topOffer;
        structuredProducts["Today's Deal"] = todaysDeal;
        return res.status(200).json({
            message: "List of products structured by category",
            products: structuredProducts,
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message,
        });
    }
};

const updateProductPrices = async (req, res) => {
    try {
        // Update all documents with a random price between 50 and 200
        const result = await Product.updateMany({}, [
            {
                $set: {
                    rating: {
                        $multiply: [
                            { $floor: { $multiply: [{ $rand: {} }, 11] } }, // Random value from 0 to 10
                            0.5, // Step size of 0.5
                        ],
                    },
                },
            },
        ]);

        // Send response with matched and modified document counts
        return res.status(200).json({
            message: `Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents`,
        });
    } catch (err) {
        console.error("Error updating prices:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


const productChatbot = async (req, res) => {
    try {
        const { productDetails, question } = req.body;
        const response = await chatbotCall(productDetails, question);
        return res.status(200).json({
            message: "Chatbot response",
            response: response,
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message,
        });
    }
};

export {
    getAllProducts,
    getProductById,
    createProduct,
    getProductByCategory,
    getAllProductsStructuredByCategory,
    updateProductPrices,
    productChatbot,
};
