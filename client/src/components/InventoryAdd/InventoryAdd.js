import React, { Component, createRef } from "react";
import axios from "axios";
import "./_InventoryAdd.scss";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

export default class InventoryAdd extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }

  state = {
    inStock: true,
    error: null,
    categoriesArray: null,
    warehousesArray: null,
    warehouseIDs: null,
  };

  componentDidMount() {
    this.getWarehouses();
  }

  getWarehouses = () => {
    axios.get("http://localhost:8080/inventories").then((response) => {
      const inventory = response.data;
      let categoriesArray = [];
      let warehousesArray = [];
      let warehouseIDs = {};
      for (let i = 0; i < inventory.length; i++) {
        if (!categoriesArray.includes(inventory[i].category)) {
          categoriesArray.push(inventory[i].category);
        }
        if (!warehousesArray.includes(inventory[i].warehouseName)) {
          warehousesArray.push(inventory[i].warehouseName);
          warehouseIDs[inventory[i].warehouseName] = inventory[i].warehouseID;
        }
      }
      this.setState({
        categoriesArray,
        warehousesArray,
        warehouseIDs,
      });
    });
  };

  itemInStock = () => {
    this.setState({
      inStock: true,
    });
  };

  itemNotInStock = () => {
    this.setState({
      inStock: null,
    });
  };

  postItem = (addItem) => {
    axios
      .post(`http://localhost:8080/inventories/add`, addItem)
      .then((response) => {
        console.log("CHECK:", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick = () => {
    const form = this.formRef.current;
    if (!form.quantity.value.trim()) {
      form.quantity.value = 0;
      return;
    }
    const quantity = +form.quantity.value;
    if (!form.itemName.value) {
      alert("Please enter valid item name!");
      return;
    }
    if (!form.description.value) {
      alert("Please enter valid item description!");
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      alert("Please enter valid quantity!");
      return;
    }
    const addItem = {
      itemName: form.itemName.value,
      description: form.description.value,
      category: form.category.value,
      status: "In Stock",
      quantity: quantity,
      warehouseName: form.warehouseName.value,
    };
    if (addItem.quantity === 0) {
      addItem.status = "Out of Stock";
    }
    addItem.warehouseID = this.state.warehouseIDs[addItem.warehouseName];
    this.postItem(addItem);
  };

  render() {
    if (!this.state.categoriesArray) {
      return null;
    }

    const quantity = (
      <>
        <label className="inventory-add__quantity-header">Quantity</label>
        <input
          name="quantity"
          className="inventory-add__quantity-input"
          placeholder="0"
        ></input>
      </>
    );
    return (
      <section className="inventory-add">
        <div className="inventory-add__container">
          <div className="inventory-add__title-cont">
            <Link className="inventory-edit__back-link" to={"/inventory"}>
              <img
                className="inventory-add__title-arrow"
                src={arrow}
                alt=""
              ></img>
            </Link>
            <h1 className="inventory-add__title">Add New Inventory Item</h1>
          </div>

          <form
            className="inventory-add__item-details-item-availability-form"
            ref={this.formRef}
          >
            <div className="inventory-add__item-details">
              <h2 className="inventory-add__item-details-title">
                Item Details
              </h2>
              <label className="inventory-add__item-name-header">
                Item Name
              </label>
              <input
                name="itemName"
                className="inventory-add__item-name-input"
                placeholder="Item Name"
              ></input>

              <label className="inventory-add__desc-header">Description</label>
              <textarea
                name="description"
                className="inventory-add__desc-textarea"
                placeholder="Please enter a brief item description..."
              ></textarea>

              <label className="inventory-add__category-header" name="category">
                Category
              </label>
              <select
                className="inventory-add__category-select"
                placeholder="Please select"
                name="category"
              >
                {this.state.categoriesArray.map((category) => (
                  <option>{category}</option>
                ))}
              </select>
            </div>
            <div className="inventory-add__division"></div>
            <div className="inventory-add__item-availability">
              <h2 className="inventory-add__item-availability-header">
                Item Availability
              </h2>
              <div className="inventory-add__status-cont">
                <label className="inventory-add__item-availability-status-header">
                  Status
                </label>
                <div className="inventory-add__item-availability-status-select">
                  <input
                    onClick={this.itemInStock}
                    name="stock-btn"
                    className="inventory-add__in-stock-btn"
                    type="radio"
                  ></input>
                  <label className="inventory-add__in-stock-name">
                    In Stock
                  </label>
                  <input
                    onClick={this.itemNotInStock}
                    name="stock-btn"
                    className="inventory-add__out-stock-btn"
                    type="radio"
                  ></input>
                  <label className="inventory-add__out-stock-name">
                    Out of Stock
                  </label>
                </div>
              </div>
              {this.state.inStock ? quantity : null}
              <label className="inventory-add__warehouse-header">
                Warehouse
              </label>
              <select
                className="inventory-add__warehouse-select"
                placeholder="Please select"
                name="warehouseName"
              >
                {this.state.warehousesArray.map((warehouse) => (
                  <option>{warehouse}</option>
                ))}
              </select>
            </div>
          </form>
          <div className="inventory-add__btn-cont">
            <Link
              to="/inventory/"
              className="inventory-add__btn-cancel"
              type="button"
            >
              Cancel
            </Link>
            <button
              className="inventory-add__btn-add"
              type="button"
              onClick={this.handleClick}
            >
              + Add Item
            </button>
          </div>
        </div>
      </section>
    );
  }
}
