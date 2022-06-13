const express = require("express");
const app = express();
const cors = require("cors");
const warehousesRouter = require("./routes/warehouses");
const inventoriesRouter = require("./routes/inventories");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/warehouses", warehousesRouter);
app.use("/inventories", inventoriesRouter);

app.listen(8080, () => {
  console.log(`Server is listening on 8080`);
});
