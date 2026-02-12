const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


require("./db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const maintananceRoutes = require("./routes/maintenanceRoutes");

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path=require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/rentals", rentalRoutes);
app.use("/maintanance", maintananceRoutes);


const PORT=process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});

