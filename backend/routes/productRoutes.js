const express = require("express");
const router = express.Router();
const db = require("../db");

// Get Products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

// Add Product
router.post("/add", (req, res) => {
  const { name, category, monthlyRent, deposit, available } = req.body;

  const sql = "INSERT INTO products (name, category, monthlyRent, deposit, available) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, category, monthlyRent, deposit, available], (err) => {
    if (err) return res.json({ message: "Error adding product" });
    res.json({ message: "Product added" });
  });
});

module.exports = router;