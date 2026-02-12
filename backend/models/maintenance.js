const db = require("../db");

const Maintenance = {

  create: (data, callback) => {
    const sql = `
      INSERT INTO maintenance
      (user, product, issue, status)
      VALUES (?, ?, ?, 'Open')
    `;

    db.query(sql,
      [data.user, data.product, data.issue],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM maintenance", callback);
  }

};

module.exports = Maintenance;