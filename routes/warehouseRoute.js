const router = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router
  .route("/") //8080/warehouse
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

router
  .route("/:id") //8080/warehouse/:id
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

router.route("/:id/inventories").get(warehouseController.warehouseInventories);
// 8080/warehouse/:id/inventories

module.exports = router;
