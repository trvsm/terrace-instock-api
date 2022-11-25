const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router
  .route("/") // 8080/inventories
  .get(inventoryController.index)
  .post(inventoryController.addInventory);

router
  .route("/:id") // 8080/inventories/:id
  .get(inventoryController.singleInventory)
  .put(inventoryController.updateInventory)
  .delete(inventoryController.deleteInventory);

// inventories / getwarehousename / inventory id;
router.route("/getwarehousename/:id").get(inventoryController.warehouseName);

module.exports = router;
