const db = require("../db");

const Rental = {

  create: (data, callback) => {
    const sql = `
      INSERT INTO rentals
      (user, product, tenure, deliveryDate, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql,
      [data.user, data.product, data.tenure, data.deliveryDate, data.status],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM rentals", callback);
  }

};

module.exports = Rental;