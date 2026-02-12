const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/request", (req, res) => {
  const { user, product, issue } = req.body;

  const sql = "INSERT INTO maintenance (user, product, issue, status) VALUES (?, ?, ?, 'Open')";

  db.query(sql, [user, product, issue], (err) => {
    if (err) return res.json({ message: "Error submitting request" });
    res.json({ message: "Maintenance request submitted" });
  });
});

module.exports = router;