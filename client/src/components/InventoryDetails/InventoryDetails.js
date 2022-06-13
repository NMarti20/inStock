import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white.svg";

export default class InventoryDetails extends Component {
  state = {
    inventoryDetails: null,
  };

  getInventoryDetails = () => {
    const inventoryID = this.props.match.params.id;
    axios
      .get(`http://localhost:8080/inventories/${inventoryID}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          inventoryDetails: response.data,
        });
      });
  };

  componentDidMount() {
    this.getInventoryDetails();
  }

  render() {
    if (!this.state.inventoryDetails) {
      return null;
    }
    return (
      <div className="inventory-details">
        <div className="inventory-details__container">
          <div className="inventory-details__title-container">
            <Link className="inventory-details__back-link" to={"/inventory"}>
              <img src={backArrow} alt="goBack" />
            </Link>
            <h1>{this.state.inventoryDetails.itemName}</h1>
            <Link
              className="inventory-details__edit-link"
              to={`/inventory/${this.state.inventoryDetails.id}/edit`}
            >
              <img
                className="inventory-details__edit-link-icon"
                src={editIcon}
                alt="editMe"
              />
            </Link>
          </div>
          <div className="inventory-details__info-section-container">
            <div className="inventory-details__description-category-container">
              <p className="inventory-details__info-label">ITEM DESCRIPTION:</p>
              <p className="inventory-details__info">
                {this.state.inventoryDetails.description}
              </p>
              <p className="inventory-details__info-label">CATEGORY:</p>
              <p className="inventory-details__info inventory-details__info--tablet-bottom">
                {this.state.inventoryDetails.category}
              </p>
            </div>
            <div className="inventory-details__status-quantity-warehouse-container">
              <div className="inventory-details__status-quantity-container">
                <div className="inventory-details__info-container">
                  <p className="inventory-details__info-label">STATUS:</p>
                  {this.state.inventoryDetails.status === "In Stock" ? (
                    <div className="inventory-details__status-info-container inventory-details__status-info-container--in-stock">
                      <p className="inventory-details__status-info inventory-details__status-info--in-stock">
                        {this.state.inventoryDetails.status.toUpperCase()}
                      </p>
                    </div>
                  ) : (
                    <div className="inventory-details__status-info-container inventory-details__status-info-container--out-of-stock">
                      <p className="inventory-details__status-info inventory-details__status-info--out-of-stock">
                        {this.state.inventoryDetails.status.toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
                <div className="inventory-details__info-container">
                  <p className="inventory-details__info-label">QUANTITY:</p>
                  <p className="inventory-details__info">
                    {this.state.inventoryDetails.quantity}
                  </p>
                </div>
              </div>
              <p className="inventory-details__info-label">WAREHOUSE:</p>
              <p className="inventory-details__info  inventory-details__info--tablet-bottom">
                {this.state.inventoryDetails.warehouseName}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
