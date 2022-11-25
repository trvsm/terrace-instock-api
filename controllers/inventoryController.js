const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("inventories")
    .select("inventories.*")
    .select("warehouses.warehouse_name")
    .join("warehouses", "warehouses.id", "=", "inventories.warehouse_id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};
exports.singleInventory = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }

      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`)
    );
};
exports.addInventory = (req, res) => {
  console.log(req.body);
  // Validate the request body for required data
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity ||
    !req.body.warehouse_id
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide item_name, description, category, status, and quantity fields in a request"
      );
  }
  // const warehouseID = ## some how need to look up warehouse ID and set as the deafult input ##
  const newInventoryId = uuidv4();
  knex("inventories")
    .insert({ ...req.body, id: newInventoryId })
    .then((_data) => {
      knex("inventories")
        .where({ id: newInventoryId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating inventory: ${err}`));
};
exports.updateInventory = (req, res) => {
  if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity ||
    !req.body.warehouse_id
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide item_name, description, category, status, and quantity fields in a request"
      );
  }
  knex("inventories")
    .update(req.body)
    .where({ id: req.params.id })
    .then((_data) => {
      knex("inventories")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) =>
      res.status(400).send(`Error updating inventory ${req.params.id} ${err}`)
    );
};
exports.deleteInventory = (req, res) => {
  knex("inventories")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      // For DELETE response we can use 204 status code
      res
        .status(204)
        .send(`Inventory with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting inventory ${req.params.id} ${err}`)
    );
};

exports.warehouseName = (req, res) => {
  knex
    .select(
      "inventories.id",
      "inventories.warehouse_id",
      "warehouses.id",
      "warehouses.warehouse_name"
    )
    .from("inventories")
    .innerJoin("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .where({ "inventories.id": req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(
          `Error retrieving warehouse name for the inventory ${req.params.id} ${err}`
        )
    );
};
