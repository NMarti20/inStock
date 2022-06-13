const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const warehouseArray = "./data/warehouses.json";

// Endpoint List
// =================================================================
// http://localhost:8080/warehouses  (Get, Post) - All warehouses
// http://localhost:8080/warehouses/:warehouseId  (Get, Put, Delete)- Single warehouse
//

const readData = () => {
  const dataContent = fs.readFileSync(warehouseArray);
  const parsedData = JSON.parse(dataContent);
  return parsedData;
};

router.get("/", (req, res) => {
  const allWarehouses = readData();
  return res.status(200).send(allWarehouses);
});
//Post new warehouse
router.post("/", (req, res) => {
  const body = req.body;
  
  if (!body.warehouseName) {
    res.status(400).send({ error: "Please enter valid name" });
  }

  if (!body.address) {
    res.status(400).send({ error: "Please enter valid address" });
  }

  if (!body.city) {
    res.status(400).send({ error: "Please enter valid city" });
  }

  if (!body.country) {
    res.status(400).send({ error: "Please enter valid country" });
  }

  if (!body.position) {
    res.status(400).send({ error: "Please enter valid position" });
  }

  if (!body.email) {
    res.status(400).send({ error: "Please enter valid email address" });
  }

  if (!body.phone) {
    res.status(400).send({ error: "Please enter valid phone number" });
  }

  const inputWarehouse = readData();

  const newWarehouse = {
    id: uuidv4(),
    name: req.body.warehouseName,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: {
      name: req.body.contactName,
      position: req.body.position,
      phone: req.body.phone,
      email: req.body.email,
    },
  };

  inputWarehouse.push(newWarehouse);

  fs.writeFileSync(warehouseArray, JSON.stringify(inputWarehouse));

  return res.status(201).json(newWarehouse);
});
// .Get Single Warehouse
router.get("/:warehouseId", (req, res) => {
  let wId = req.params.warehouseId;
  const allWarehouses = readData();
  const selectedWarehouse = allWarehouses.find(
    (warehouse) => warehouse.id === wId
  );
  return res.status(200).send(selectedWarehouse);
});

router.put("/:warehouseId", (req, res) => {
  let wId = req.params.warehouseId;
  const allWarehouses = readData();
  const selectedWarehouse = allWarehouses.find(
    (warehouse) => warehouse.id === wId
  );

  const updateWarehouse = req.body;

  if (selectedWarehouse) {
    selectedWarehouse.id = updateWarehouse.id
      ? updateWarehouse.id
      : selectedWarehouse.id;
    selectedWarehouse.name = updateWarehouse.name
      ? updateWarehouse.name
      : selectedWarehouse.name;
    selectedWarehouse.address = updateWarehouse.address
      ? updateWarehouse.address
      : selectedWarehouse.address;
    selectedWarehouse.city = updateWarehouse.city
      ? updateWarehouse.city
      : selectedWarehouse.city;
    selectedWarehouse.country = updateWarehouse.country
      ? updateWarehouse.country
      : selectedWarehouse.country;

    if (updateWarehouse.contact) {
      selectedWarehouse.contact.name = updateWarehouse.contact.name
        ? updateWarehouse.contact.name
        : selectedWarehouse.contact.name;
      selectedWarehouse.contact.position = updateWarehouse.contact.position
        ? updateWarehouse.contact.position
        : selectedWarehouse.contact.position;
      selectedWarehouse.contact.phone = updateWarehouse.contact.phone
        ? updateWarehouse.contact.phone
        : selectedWarehouse.contact.phone;
      selectedWarehouse.contact.email = updateWarehouse.contact.email
        ? updateWarehouse.contact.email
        : selectedWarehouse.contact.email;
    }
    // console.log(allWarehouses)
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(allWarehouses));
    return res.status(201).send(allWarehouses);
  } else {
    return res.status(400).send("Not found");
  }
});

router.delete("/:warehouseId", (req, res) => {
  let wId = req.params.warehouseId;
  const allWarehouses = readData();
  const remainingWarehouses = allWarehouses.filter(
    (warehouse) => warehouse.id !== wId
  );
  fs.writeFileSync(
    "./data/warehouses.json",
    JSON.stringify(remainingWarehouses)
  );
  return res.status(201).send(remainingWarehouses);
});
module.exports = router;
