const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const warehouseRoutes = require("./routes/warehouseRoute");

// home route:  we can safely delete this
// app.get("/", (req, res) => {
//   res.send("Welcome to my API");
// });

// all warehouses routes
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
