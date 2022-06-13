import React, { Component } from "react";
import WarehouseListSearch from "../WarehouseListSearch/WarehouseListSearch";
import WarehouseList from "../WarehouseList/WarehouseList";
import axios from "axios";

export default class Warehouses extends Component {
  state = {
    warehouseList: null,
  };
  deleteWarehouse = (warehouse) => {
    axios
      .delete(`http://localhost:8080/warehouses/${warehouse.id}`)
      .then((res) => {
        this.getWarehouseList();
      });
  };
  // editWarehouse = (warehouse) => {
  //   axios.put(`http://localhost:8080/warehouses/${warehouse.id}`)
  //   .then(res => {
  //     console.log(res)
  //   })
  // }
  getWarehouseList = () => {
    axios.get("http://localhost:8080/warehouses").then((response) => {
      this.setState({
        warehouseList: response.data,
      });
    });
  };

  componentDidMount() {
    this.getWarehouseList();
  }

  render() {
    return (
      <section className="warehouses">
        <div className="warehouses__search-list-container">
          <WarehouseListSearch />
          {this.state.warehouseList && (
            <WarehouseList
              warehouseList={this.state.warehouseList}
              deleteWarehouse={this.deleteWarehouse}
            />
          )}
        </div>
      </section>
    );
  }
}
