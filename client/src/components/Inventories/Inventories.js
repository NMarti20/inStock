import React, { Component } from "react";
import InventoryListSearch from "../InventoryListSearch/InventoryListSearch";
import InventoryList from "../InventoryList/InventoryList";
import axios from "axios";
import "./_Inventories.scss";

export default class Inventories extends Component {
  state = {
    inventoryList: null,
  };
  deleteInventory = (inventory) => {
    axios
      .delete(`http://localhost:8080/inventories/${inventory.id}`)
      .then((res) => {
        this.getInventoryList();
      });
  };
  getInventoryList = () => {
    axios
      .get("http://localhost:8080/inventories")
      .then((response) => {
        this.setState({
          inventoryList: response.data,
        });
      })
      .catch((err) => {
        console.log(`${err}:ERROR`);
      });
  };

  componentDidMount() {
    this.getInventoryList();
  }

  render() {
    return (
      <section className="inventories">
        <div className="inventories__search-list-container">
          <InventoryListSearch />
          {this.state.inventoryList && (
            <InventoryList
              inventoryList={this.state.inventoryList}
              deleteInventory={this.deleteInventory}
            />
          )}
        </div>
      </section>
    );
  }
}
