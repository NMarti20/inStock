import "./WarehouseDetails.scss";
import WarehouseDetailsInventoryItem from "../WarehouseDetailsInventoryItem/WarehouseDetailsInventoryItem";
import sortIcon from "../../assets/icons/sort-24px.svg";
import editIconWhite from "../../assets/icons/edit-white.svg";
import backIcon from "../../assets/icons/arrow_back-24px.svg";

import axios from "axios";
import React, { Component } from "react";

export default class WarehouseDetails extends Component {
  state = {
    currentWarehouse: null,
    currentInventory: null,
  };

  getCurrentWarehouse(warehouseId) {
    axios.get(`http://localhost:8080/warehouses/${warehouseId}`).then((res) => {
      this.setState({ currentWarehouse: res.data });
      this.getInventory(this.props.match.params.id);
      // console.log(res.data)
    });
  }
  getInventory(warehouseId) {
    axios
      .get(`http://localhost:8080/inventories/warehouse/${warehouseId}`)
      .then((res) => {
        this.setState({ currentInventory: res.data });
      });
  }
  deleteInventory = (inventory) => {
    axios
      .delete(`http://localhost:8080/inventories/${inventory.id}`)
      .then((res) => {
        console.log(res.data);
        // this.setState({ currentInventory: res.data })
        this.getInventory(inventory.warehouseID);
      });
  };

  componentDidMount() {
    this.getCurrentWarehouse(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {}
  //
  render() {
    console.log("Loading Inventory");
    if (!this.state.currentInventory) {
      return <h2>Loading...</h2>;
    }

    return (
      <section className="warehouse-details">
        <div className="warehouse-details__container">
          <div className="warehouse-details__header">
            <img
              src={backIcon}
              alt=""
              className="warehouse-details__header-back-icon"
            />
            <h2 className="warehouse-details__header-name">
              {this.state.currentWarehouse.name}
            </h2>
            <div className="warehouse-details__header-iconbox">
              <img
                src={editIconWhite}
                alt=""
                className="warehouse-details__header-edit-icon"
              />
              <p className="warehouse-details__header-edit">Edit</p>
            </div>
          </div>

          {/* warehouse details */}
          <div className="warehouse-details__contact-details">
            <div className="warehouse-details__first-contact-container">
              <p className="warehouse-details__label">Warehouse Address</p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.address}
              </p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.city},{" "}
                {this.state.currentWarehouse.country}
              </p>
            </div>
            <div className="warehouse-details__contact-container">
              <p className="warehouse-details__label">Contact Name</p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.contact.name}
              </p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.contact.position}
              </p>
            </div>
            <div className="warehouse-details__contact-container">
              <p className="warehouse-details__label">Contact Information</p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.contact.phone}
              </p>
              <p className="warehouse-details__content">
                {this.state.currentWarehouse.contact.email}
              </p>
            </div>
          </div>

          {/* Warehouse Legend */}
          <div className="warehouse-details__guide">
            <div className="warehouse-details__guide-item warehouse-details__guide-item--inventory">
              <p>Inventory Item</p>
              <button className="warehouse-details__guide-item-button">
                <img
                  className="warehouse-details__guide-item-button-icon"
                  src={sortIcon}
                  alt="sort button"
                />
              </button>
            </div>
            <div className="warehouse-details__guide-item warehouse-details__guide-item--address">
              <p>Category</p>
              <button className="warehouse-details__guide-item-button">
                <img
                  className="warehouse-details__guide-item-button-icon"
                  src={sortIcon}
                  alt="category sort button"
                />
              </button>
            </div>
            <div className="warehouse-details__guide-item warehouse-details__guide-item--status">
              <p>Status</p>
              <button className="warehouse-details__guide-item-button">
                <img
                  className="warehouse-details__guide-item-button-icon"
                  src={sortIcon}
                  alt="status sort button"
                />
              </button>
            </div>
            <div className="warehouse-details__guide-item warehouse-details__guide-item--contact-info">
              <p>Quantity</p>
              <button className="warehouse-details__guide-item-button">
                <img
                  className="warehouse-details__guide-item-button-icon"
                  src={sortIcon}
                  alt="Quality sort button"
                />
              </button>
            </div>
            <div className="warehouse-details__guide-item warehouse-details__guide-item--actions">
              <p>ACTIONS</p>
            </div>
          </div>

          {this.state.currentInventory.map((item) => {
            return (
              <WarehouseDetailsInventoryItem
                currentItem={item}
                key={item.id}
                deleteInventory={this.deleteInventory}
              />
            );
          })}
        </div>
      </section>
    );
  }
}
