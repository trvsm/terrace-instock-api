const express = require("express");
const router = express.Router();

const { newId, updatedList } = require("../utilities/utilities");

// sample items for testing
const items = [
  {
    id: 1,
    item: "keyboard",
  },
];

//
// API: .GET all inventory items
router.get("/", (_req, res) => {
  try {
    res.status(200).json(items);
  } catch (error) {
    console.log("Error getting inventory list", error);
  }
});

// API: .GET single item details
router.get("/:id", (req, res) => {
  const found = items.find((item) => item.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({
      error: `Item with ID ${req.params.id} not found`,
    });
  }
});

// API: .GET inventories for warehouse (by warehouse id?)
// will need to use SQL join for this request
// ??QUESTION?? does this belong in inventory or warehouse route?
// maybe in warehouses/:id/inventory

// API: .POST new inventory item
router.post("/", (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({
      error: "please provide all item fields",
    });
  }
  const newItem = {
    id: newId(),
    item,
  };
  warehouses.push(newItem);
  // write to database
  res.status(201).json(newItem);
});

// API: .PUT/PATCH inventory item
router.patch("/:id", (req, res) => {
  const found = items.find((item) => item.id === req.params.id);
  if (found) {
    updatedList(items, req);
    res.json({ msg: "list updated", items: items });
  } else {
    res.status(404).json({
      error: `Item with ID ${req.params.id} not found`,
    });
  }
});

// API: .DELETE inventory item
router.delete("/:id", (req, res) => {
  const found = items.find((item) => item.id === req.params.id);
  if (found) {
    const itemsAfterDeletion = items.filter(
      (item) => item.id !== req.params.id
    );
    // rewrite list without item
  } else {
    res.status(404).json({
      error: `Item with ID ${req.params.id} not found`,
    });
  }
});

module.exports = router
