const express = require("express");
const router = express.Router();

const { newId, updatedList } = require("../utilities/utilities");

// sample warehouses for testing
const warehouses = [
  {
    id: 1,
    location: "kaslo",
  },
];

// API: .GET list all warehouses
router.get("/", (_req, res) => {
  try {
    res.status(200).json(warehouses);
  } catch (error) {
    console.log("Error getting warehouse list", error);
  }
});

// API: .GET single warehouse details
router.get("/:id", (req, res) => {
  const found = warehouses.find((warehouse) => warehouse.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({
      error: `Warehouse with ID ${req.params.id} not found`,
    });
  }
});

// API: .POST new warehouse
router.post("/", (req, res) => {
  const { location } = req.body;
  if (!location) {
    return res.status(400).json({
      error: "please provide all warehouse fields",
    });
  }
  const newWarehouse = {
    id: newId(),
    location,
  };
  warehouses.push(newWarehouse);
  // write to database
  res.status(201).json(newWarehouse);
});

// API: .PUT/PATCH warehouse
router.patch("/:id", (req, res) => {
  const found = warehouses.find((warehouse) => warehouse.id === req.params.id);
  if (found) {
    updatedList(warehouses, req);
    res.json({ msg: "list updated", warehouses: warehouses });
  } else {
    res.status(404).json({
      error: `Warehouse with ID ${req.params.id} not found`,
    });
  }
});

module.exports = router