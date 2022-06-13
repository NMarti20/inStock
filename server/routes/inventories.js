const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const inventoriesData = "./data/inventories.json";

const readData = () => {
  const dataContent = fs.readFileSync(inventoriesData);
  const parsedData = JSON.parse(dataContent);
  return parsedData;
};

router.get("/", (req, res) => {
  const inventoriesDataRead = readData();
  return res.status(200).send(inventoriesDataRead);
});

router.get("/warehouse/:warehouseId", (req, res) => {
  let wId = req.params.warehouseId;
  const inventoriesDataRead = readData();
  const warehouseInventory = inventoriesDataRead.filter(
    (item) => item.warehouseID === wId
  );
  return res.status(200).send(warehouseInventory);
});

router.get("/:id", (req, res) => {
  const inventoryItem = readData();

  const getItem = inventoryItem.find(
    (inventoryItem) => inventoryItem.id === req.params.id
  );

  if (!getItem) {
    return res.status(500).send("Item not found");
  }
  res.json(getItem);
});

router.post("/add", (req, res) => {
  if (!req.body.itemName.trim()) {
    res.status(400).send({ error: "Please enter item name." });
    return;
  }

  if (!req.body.warehouseName.trim()) {
    res.status(400).send({ error: "Please select warehouse." });
    return;
  }

  if (!req.body.warehouseID.trim()) {
    res.status(400).send({ error: "Please enter warehouse ID." });
    return;
  }

  if (!req.body.description.trim()) {
    res.status(400).send({ error: "Please enter description." });
    return;
  }

  if (!req.body.category.trim()) {
    res.status(400).send({ error: "Please select category." });
    return;
  }

  if (!req.body.status.trim()) {
    res.status(400).send({ error: "Please select status." });
    return;
  }
  const quantity = +req.body.quantity;

  if (isNaN(quantity) || quantity < 0) {
    res.status(400).send("Please enter valid quantity.");
    return;
  }

  const inventory = readData();
  const newInventoryItem = {
    id: uuidv4(),
    warehouseID: req.body.warehouseID.trim(),
    warehouseName: req.body.warehouseName.trim(),
    itemName: req.body.itemName.trim(),
    description: req.body.description.trim(),
    category: req.body.category.trim(),
    status: req.body.status.trim(),
    quantity: req.body.quantity,
  };

  inventory.push(newInventoryItem);
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventory));
  res.status(201).send(newInventoryItem);
});

// Edit single item inventory
router.put("/:id", (req, res) => {
  const inventoryData = readData();

  const updateInventory = req.body;
  const foundItem = inventoryData.find(
    (inventoryItem) => inventoryItem.id === req.params.id
  );

  if (foundItem) {
    foundItem.id = updateInventory.id ? updateInventory.id : foundItem.id;
    foundItem.warehouseID = updateInventory.warehouseID
      ? updateInventory.warehouseID
      : foundItem.warehouseID;
    foundItem.warehouseName = updateInventory.warehouseName
      ? updateInventory.warehouseName
      : foundItem.warehouseName;
    foundItem.itemName = updateInventory.itemName
      ? updateInventory.itemName
      : foundItem.itemName;
    foundItem.description = updateInventory.description
      ? updateInventory.description
      : foundItem.description;
    foundItem.category = updateInventory.category
      ? updateInventory.category
      : foundItem.category;
    foundItem.status = updateInventory.status
      ? updateInventory.status
      : foundItem.category;
    foundItem.quantity = String(updateInventory.quantity)
      ? +updateInventory.quantity
      : foundItem.quantity;

    fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));
    return res.status(201).send(inventoryData);
  } else {
    return res.status(400).send("Try Again");
  }
});

router.delete("/:id", (req, res) => {
  const inventoryID = req.params.id;
  inventoryData = readData();

  inventoryData = inventoryData.filter(
    (inventoryItem) => inventoryItem.id !== inventoryID
  );

  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));
  res.status(201).send(inventoryData);
});

module.exports = router;
