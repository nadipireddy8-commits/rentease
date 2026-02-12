const db = require("../db");

const Product = {

  create: (data, callback) => {
    const sql = `
      INSERT INTO products 
      (name, category, monthlyRent, deposit, available) 
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, 
      [data.name, data.category, data.monthlyRent, data.deposit, data.available], 
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
  }

};

module.exports = Product;