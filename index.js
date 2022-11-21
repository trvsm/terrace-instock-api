// setup dotenv to support ports by run environment
const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// initialize express server
const express = require("express");
const app = express();

// setup middleware: CORS for client requests, express.json to handle data
app.use(cors())
app.use(express.json());

// routes for warehouse resource
app.use('/warehouses', warehouseRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running: ${PORT}`);
});
