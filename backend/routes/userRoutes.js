const express = require("express");
const router = express.Router();
const db = require("../db");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // save user
    await User.create({ username, password });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: "User already exists" });
  }
});


// ================= LOGIN =================
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false });
    }

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false });
        }

        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = router;