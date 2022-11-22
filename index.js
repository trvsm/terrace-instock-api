const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

// setup middleware: CORS for client requests, express.json to handle data
app.use(cors());
app.use(express.json());

// home page
app.get("/", (req, res) => {
  res.send(
    "Welcome to Terrace's API for inStock. By Mahdi, Travis, Gurpreeet, and Leo."
  );
});

// all warehouses routes
const warehouseRoutes = require("./routes/warehouseRoute");
app.use("/warehouses", warehouseRoutes);

// all inventory routes
const inventoryRoutes = require("./routes/inventoryRoute");
app.use("/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
