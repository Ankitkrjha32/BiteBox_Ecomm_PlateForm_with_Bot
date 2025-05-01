import { signUp, login, logout, refreshAccessToken, addToCart, getCart, deleteCartItem, updateCartItem } from "../../controllers/user.controller.js";
import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.get("/refresh-access-token", refreshAccessToken);
router.post("/cart", verifyJWT, addToCart);
router.get("/cart", verifyJWT, getCart);
router.delete("/cart/:productId", verifyJWT, deleteCartItem);
router.put("/cart/:productId", verifyJWT, updateCartItem);

export default router;