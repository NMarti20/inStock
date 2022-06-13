import DeleteModal from "../DeleteModal/DeleteModal";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import { Link } from "react-router-dom";
import "./_InventoryListItem.scss";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";

import React, { Component } from "react";

export default class InventoryListItem extends Component {
  state = {
    modal: false,
  };

  stockStyles = () => {
    if (this.props.quantity <= 0) {
      return "--stock";
    } else {
      return "--inStock";
    }
  };

  toggleModal = () => {
    if (!this.state.modal) {
      this.setState({ modal: true });
    } else {
      this.setState({ modal: false });
    }
    console.log(this.state);
  };
  render() {
    return (
      <li className="inventory-list-item">
        <div className="inventory-list-item__info-container">
          <div className="inventory-list-item__first-container">
            <div className="inventory-list-item__label-info-container inventory-list-item__label-info-container--inventory-item">
              <p className="inventory-list-item__info-label">INVENTORY ITEM</p>
              <div className="inventory-list-item__information">
                <Link
                  to={`/inventory/${this.props.id}`}
                  className="inventory-list-item__info inventory-list-item__info--link"
                >
                  {this.props.itemName}
                  <img
                    className="inventory-list-item__info inventory-list-item__info--icon"
                    src={chevronRight}
                    alt="back button"
                  />
                </Link>
              </div>
            </div>
            <div className="inventory-list-item__label-info-container inventory-list-item__label-info-container--category">
              <p className="inventory-list-item__info-label">CATEGORY</p>
              <p className="inventory-list-item__info inventory-list-item__info--category">
                {this.props.category}
              </p>
            </div>
          </div>
          <div className="inventory-list-item__second-container">
            <div className="inventory-list-item__label-info-container inventory-list-item__label-info-container--status">
              <p className="inventory-list-item__info-label">STATUS</p>
              <p className={`inventory-list-item__info${this.stockStyles()}`}>
                {this.props.status}
              </p>
            </div>
            <div className="inventory-list-item__label-info-container inventory-list-item__label-info-container--qty">
              <p className="inventory-list-item__info-label">QTY</p>
              <p className="inventory-list-item__info inventory-list-item__info--qty">
                {this.props.quantity}
              </p>
            </div>
            <div className="inventory-list-item__label-info-container inventory-list-item__label-info-container--warehouse">
              <p className="inventory-list-item__info-label">WAREHOUSE</p>
              <p className="inventory-list-item__info inventory-list-item__info--warehouse">
                {this.props.warehouseName}
              </p>
            </div>
          </div>
        </div>
        <div className="inventory-list-item__buttons-container">
          <button
            className="inventory-list-item__button inventory-list-item__button--delete"
            onClick={this.toggleModal}
          >
            <img src={deleteIcon} alt="" />
          </button>
          <DeleteModal
            activeModal={this.state.modal}
            currentItem={this.props.currentItem}
            toggleModal={this.toggleModal}
            deleteInventory={this.props.deleteInventory}
          />

          <Link
            to={`/inventory/${this.props.id}/edit`}
            className="inventory-list-item__button"
          >
            <img src={editIcon} alt="" />
          </Link>
        </div>
      </li>
    );
  }
}
