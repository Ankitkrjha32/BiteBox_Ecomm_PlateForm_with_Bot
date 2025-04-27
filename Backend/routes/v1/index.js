import express from "express";
import productsRoutes from "./products.routes.js";
// import usersRoutes from "./users.routes.js"; // Example for user routes
// import ordersRoutes from "./orders.routes.js"; // Example for orders routes

const router = express.Router();

// Attach specific routes for version 1
router.use("/products", productsRoutes);
// router.use("/users", usersRoutes);
// router.use("/orders", ordersRoutes);

export default router;
