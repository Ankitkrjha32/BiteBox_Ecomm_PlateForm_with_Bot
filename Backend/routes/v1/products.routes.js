import express from "express";

const router = express.Router();

// Example product routes
router.get("/", (req, res) => {
    res.json({ message: "List of all products" });
});

router.post("/", (req, res) => {
    res.json({ message: "Add a new product" });
});

router.get("/:id", (req, res) => {
    res.json({ message: `Get details of product with ID ${req.params.id}` });
});

export default router;
