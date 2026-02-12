const express = require("express");
const router = express.Router();
const db = require("../db");

// Rent Product
// Get rentals by user
router.get("/:user", (req, res) => {
    const user = req.params.user;

    const sql = "SELECT * FROM rentals WHERE user = ?";

    db.query(sql, [user], (err, result) => {
        if (err) return res.json({ message: "Error fetching rentals" });
        res.json(result);
    });
});

module.exports = router;