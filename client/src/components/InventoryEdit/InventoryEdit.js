import React, { Component, createRef } from "react";
import axios from "axios";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import { Link } from "react-router-dom";

export default class InventoryEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
  }
  state = {
    inventoryItem: null,
    inStock: null,
    error: null,
    categoriesArray: null,
    warehousesArray: null,
    warehouseIDs: null,
  };

  getInventoryItem = () => {
    axios
      .get(`http://localhost:8080/inventories/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          inventoryItem: response.data,
          inStock: response.data.status,
        });
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
              warehouseIDs[inventory[i].warehouseName] =
                inventory[i].warehouseID;
            }
          }
          this.setState({
            categoriesArray,
            warehousesArray,
            warehouseIDs,
          });
        });
      });
  };

  componentDidMount() {
    this.getInventoryItem();
  }

  handleClick = () => {
    const form = this.formRef.current;

    if (!form.quantity.value.trim()) {
      this.setState({
        error: "quantity",
      });
      return;
    }

    const quantity = +form.quantity.value;

    if (!form.itemName.value.trim()) {
      this.setState({
        error: "itemName",
      });
      return;
    }

    if (!form.description.value.trim()) {
      this.setState({
        error: "description",
      });
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      this.setState({
        error: "quantity",
      });
      return;
    }

    const editedItem = {
      id: this.props.match.params.id,
      warehouseName: form.warehouseName.value,
      itemName: form.itemName.value,
      description: form.description.value,
      category: form.category.value,
      status: "In Stock",
      quantity: quantity,
    };

    if (editedItem.quantity === 0) {
      editedItem.status = "Out of Stock";
    }

    editedItem.warehouseID = this.state.warehouseIDs[editedItem.warehouseName];
    axios
      .put(
        `http://localhost:8126/inventories/${this.props.match.params.id}`,
        editedItem
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  itemInStock = () => {
    this.setState({
      inStock: "In Stock",
    });
  };

  itemNotInStock = () => {
    this.setState({
      inStock: "Out of Stock",
    });
  };

  render() {
    const errorMessage = (
      <div className="inventory-edit__error-container">
        <img className="inventory-edit__error-icon" src={errorIcon} />
        <p className="inventory-edit__error-message">This field is required</p>
      </div>
    );

    if (!this.state.categoriesArray) {
      return null;
    }

    return (
      <div className="inventory-edit">
        <div className="inventory-edit__container">
          <div className="inventory-edit__title-container">
            <Link className="inventory-edit__back-link" to={"/inventory"}>
              <img
                className="inventory-edit__back-link-icon"
                src={backArrow}
                alt="back button"
              />
            </Link>
            <h1 className="inventory-edit__title">Edit Inventory Item</h1>
          </div>
          <form className="inventory-edit__form" ref={this.formRef}>
            <div className="inventory-edit__item-details-container">
              <div className="inventory-edit__item-details-inner-container">
                <h2 className="inventory-edit__section-title">Item Details</h2>
                <label className="inventory-edit__label">Item Name</label>
                <div className="inventory-edit__input-error-container">
                  <input
                    name="itemName"
                    className="inventory-edit__input"
                    defaultValue={this.state.inventoryItem.itemName}
                  />
                  {this.state.error === "itemName" && errorMessage}
                </div>
                <label className="inventory-edit__label">Description</label>
                <div className="inventory-edit__input-error-container">
                  <textarea
                    name="description"
                    className="inventory-edit__input inventory-edit__input--text-area"
                    defaultValue={this.state.inventoryItem.description}
                  />
                  {this.state.error === "description" && errorMessage}
                </div>
                <label className="inventory-edit__label">Category</label>
                <select name="category" className="inventory-edit__input">
                  {this.state.categoriesArray.map((category) => (
                    <option>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="inventory-edit__item-availability-container">
              <div className="inventory-edit__item-availability-inner-container">
                <h2 className="inventory-edit__section-title">
                  Item Availability
                </h2>
                <p className="inventory-edit__label inventory-edit__label--status">
                  Status
                </p>
                {this.state.inStock === "In Stock" ? (
                  <>
                    <div className="inventory-edit__in-stock-buttons-container">
                      <div className="inventory-edit__in-stock-button-container">
                        <input
                          className="inventory-edit__radio-button inventory-edit__radio-button--checked"
                          type="radio"
                          name="status"
                          defaultChecked
                        />
                        <label className="inventory-edit__radio-button-label inventory-edit__radio-button-label--checked">
                          In Stock
                        </label>
                      </div>
                      <div className="inventory-edit__in-stock-button-container inventory-edit__radio-button-container--right">
                        <input
                          onClick={this.itemNotInStock}
                          className="inventory-edit__radio-button"
                          type="radio"
                          name="status"
                        />
                        <label className="inventory-edit__radio-button-label">
                          Out of Stock
                        </label>
                      </div>
                    </div>
                    <label className="inventory-edit__label">Quantity</label>
                    <div className="inventory-edit__input-error-container">
                      <input
                        name="quantity"
                        className="inventory-edit__input"
                        defaultValue={this.state.inventoryItem.quantity}
                      />
                      {this.state.error === "quantity" && errorMessage}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="inventory-edit__in-stock-buttons-container">
                      <div className="inventory-edit__in-stock-button-container">
                        <input
                          onClick={this.itemInStock}
                          className="inventory-edit__radio-button"
                          type="radio"
                          name="status"
                        />
                        <label className="inventory-edit__radio-button-label">
                          In Stock
                        </label>
                      </div>
                      <div className="inventory-edit__in-stock-button-container inventory-edit__radio-button-container--right">
                        <input
                          className="inventory-edit__radio-button inventory-edit__radio-button-label--checked"
                          type="radio"
                          name="status"
                          defaultChecked
                        />
                        <label className="inventory-edit__radio-button-label inventory-edit__radio-button-label--checked">
                          Out of Stock
                        </label>
                      </div>
                    </div>
                    <div className="inventory-edit__hidden-quantity">
                      <label className="inventory-edit__label">Quantity</label>
                      <input
                        name="quantity"
                        className="inventory-edit__input"
                        defaultValue={0}
                      />
                    </div>
                  </>
                )}
                <label className="inventory-edit__label">Warehouse</label>
                <select name="warehouseName" className="inventory-edit__input">
                  {this.state.warehousesArray.map((warehouse) => (
                    <option>{warehouse}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className="inventory-edit__buttons-container">
            <Link
              className="inventory-edit__button inventory-edit__button--cancel"
              to="/inventory"
            >
              <p>Cancel</p>
            </Link>
            <button
              className="inventory-edit__button inventory-edit__button--save"
              onClick={this.handleClick}
              type="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
