import "./App.scss";
import Warehouses from "./components/Warehouses/Warehouses";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import Inventories from "./components/Inventories/Inventories";
import PageHeader from "./components/PageHeader/PageHeader";
import InventoryEdit from "./components/InventoryEdit/InventoryEdit";
import InventoryAdd from "./components/InventoryAdd/InventoryAdd";
import WarehouseEdit from "./components/WarehouseEdit/WarehouseEdit";
import WarehouseAdd from "./components/WarehouseAdd/WarehouseAdd";
import Footer from "./components/Footer/Footer";
import InventoryDetails from "./components/InventoryDetails/InventoryDetails";

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Switch>
        <Route path="/" exact component={Warehouses} />
        <Route path="/warehouse/add" exact component={WarehouseAdd} />
        <Route path="/warehouse/:id" exact component={WarehouseDetails} />
        <Route path="/warehouse/edit/:id" exact component={WarehouseEdit} />
        <Route path="/inventory" exact component={Inventories} />
        <Route path="/inventory/:id/edit" exact component={InventoryEdit} />
        <Route path="/inventory/add" exact component={InventoryAdd} />
        <Route path="/inventory/:id" exact component={InventoryDetails} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
