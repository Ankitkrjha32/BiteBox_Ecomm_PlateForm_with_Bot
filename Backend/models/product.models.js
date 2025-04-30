import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantityInStock: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        imageurl: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        isOrganic: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
