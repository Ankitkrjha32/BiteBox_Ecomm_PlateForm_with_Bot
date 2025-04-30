import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, // Link the order to a user
        },
        name: {
            type: String,
            required: true, // Name of the customer
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product", // Reference to the product being purchased
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true, // Quantity of the product purchased
                    min: 1,
                },
                unit: {
                    type: String,
                    enum: ["kg", "pack", "bunch"],
                    required: true, // The unit of measurement
                },
                price: {
                    type: Number,
                    required: true, // Price at the time of purchase
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true, // Total amount of the order
        },
        shippingAddress: {
            streetAddress: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        status: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["creditCard", "UPI", "bankTransfer", "cashOnDelivery"],
            required: true,
        },
    },
    { timestamps: true }
);

// middleware to update the totalAmount before saving an order.
orderSchema.pre("save", function (next) {
    if (this.isModified("products")) {
        const total = this.products.reduce((sum, product) => {
            return sum + product.price * product.quantity;
        }, 0);
        this.totalAmount = total;
    }
    next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
