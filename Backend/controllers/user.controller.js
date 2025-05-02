import User from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../helper/generateAccessAndRefreshToken.js";
import jwt from "jsonwebtoken";

// signup a new user
const signUp = async (req, res) => {
    try {
        // Destructure the user's data from the request body
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: 400,
                success: false,
            });
        }

        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                message: "User already exists",
                status: 400,
                success: false,
            });
        }

        // Check for minimum password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long",
                status: 400,
                success: false,
            });
        }

        // Apply email regex
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                status: 400,
                success: false,
            });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // fetch user information
        const user = await User.findById(newUser._id).select("-password");

        // Send back the created user's information
        return res.status(201).json({
            message: "User registered successfully",
            user,
            status: 201,
            success: true,
        });
    } catch (error) {
        console.error("error while registering a user", error);
        return res.status(500).json({
            message: "Error while registering a user",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// login an existing user
const login = async (req, res) => {
    try {
        // Destructure the user's data from the request body
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                status: 400,
                success: false,
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                status: 400,
                success: false,
            });
        }

        // Check if the password is correct
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                status: 400,
                success: false,
            });
        }

        // Generate access token and refresh token
        const { accessToken, newRefreshToken: refreshToken } = await generateAccessAndRefreshToken(user._id);


        // Fetch user information
        let userDetails = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        // Add accessToken to userDetails
        userDetails = { ...userDetails.toObject(), accessToken };

        // sending accessToken and refreshToken as cookies
        const option = {
            httpOnly: true,
            secure: true,
        };

        // Send back the user's information
        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json({
                message: "User logged in successfully",
                user: userDetails,
                status: 200,
                success: true,
            });
    } catch (error) {
        console.error("error while logging in a user", error);
        return res.status(500).json({
            message: "Error while logging in a user",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// Generate a new access token and using the refresh token
const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken =
            req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(403).json({
                message: "Unauthorized request: Refresh token is required",
                status: 403,
                success: false,
            });
        }

        const decoded = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );


        const user = await User.findById(decoded?._id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized request: Invalid refresh token",
                status: 401,
                success: false,
            });
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(403).json({
                message: "Unauthorized request: Refresh token in invalid or expired",
                status: 403,
                success: false,
            });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                status: 200,
                data: {
                    accessToken: accessToken,
                },
                message: "Access token was updated successfully",
                success: true,
            });
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

// logout a user
const logout = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(
            userId,
            {
                // unset is used to remove this field from mongo, it is better than set refrehToken to null or undef
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );

        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                status: 200,
                message: "User logged out successfully",
                success: true,
            });
    } catch (error) {
        return res.status(403).json({
            message: "Error while logging out a user",
            error: error.message,
            status: 403,
            success: false,
        });
    }
};

// Add a product to user's cart
const addToCart = async (req, res) => {
    try {
        console.log("Adding product to cart...");
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        // Validate inputs
        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Product ID and valid quantity are required",
                status: 400,
                success: false,
            });
        }

        // Find the user
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404,
                success: false,
            });
        }

        // Check if product already exists in cart
        const existingCartItemIndex = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingCartItemIndex >= 0) {
            // Update quantity if product already exists
            user.cart[existingCartItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new product to cart
            user.cart.push({
                product: productId,
                quantity: parseInt(quantity)
            });
        }

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({
            message: "Error adding product to cart",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the user and populate the cart with product details
        const user = await User.findById(userId).populate("cart.product");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Cart retrieved successfully",
            cart: user.cart,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        return res.status(500).json({
            message: "Error retrieving cart",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        // Validate inputs
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                status: 400,
                success: false,
            });
        }

        // Find the user
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404,
                success: false,
            });
        }

        // Remove the product from the cart
        user.cart = user.cart.filter(
            (item) => item.product.toString() !== productId
        );

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart: user.cart,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        return res.status(500).json({
            message: "Error removing product from cart",
            error: error.message,
            status: 500,
            success: false,
        });
    }
};


const updateCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validate inputs
        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Product ID and valid quantity are required",
                status: 400,
                success: false,
            });
        }

        // Find the user
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404,
                success: false,
            });
        }

        // Check if product exists in cart
        const existingCartItemIndex = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingCartItemIndex < 0) {
            return res.status(404).json({
                message: "Product not found in cart",
                status: 404,
                success: false,
            });
        }

        // Update quantity
        user.cart[existingCartItemIndex].quantity = parseInt(quantity);

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            message: "Product quantity updated successfully",
            cart: user.cart,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error updating product quantity in cart:", error);
        return res.status(500).json({
            message: "Error updating product quantity in cart",
            error: error.message,
            status: 500,
            success: false,
        });
    }
}

const getMe = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the user and exclude password and refreshToken
        const user = await User.findById(userId).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: 404,
                success: false,
            });
        }

        return res.status(200).json({
            message: "User retrieved successfully",
            user,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({
            message: "Error retrieving user",
            error: error.message,
            status: 500,
            success: false,
        });
    }
}


export { signUp, login, refreshAccessToken, logout, addToCart, getCart, deleteCartItem, updateCartItem, getMe };
