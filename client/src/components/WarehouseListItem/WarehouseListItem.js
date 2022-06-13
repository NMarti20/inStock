
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import chevronRightIcon from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import WarehouseDeleteModal from "../WarehouseDeleteModal/WarehouseDeleteModal"
import React, { Component } from 'react'

export default class WarehouseListItem extends Component {
  state = {
    modal: false,
  }
  // { name, contact, address, city, country, id } = props;

  toggleModal = () => {
    if (!this.state.modal) {
      this.setState({ modal: true })
    } else {
      this.setState({ modal: false })
    }
    console.log(this.state)
  }
  render() {
    return (
      <li className="warehouse-list-item">
        <div className="warehouse-list-item__information-container">
          <div className="warehouse-list-item__location-container">
            <div className="warehouse-list-item__label-information-container warehouse-list-item__label-information-container--warehouse">
              <p className="warehouse-list-item__information-label">WAREHOUSE</p>
              <div className="warehouse-list-item__information">
                <Link
                  to={`/warehouse/${this.props.id}`}
                  className="warehouse-list-item__information-link"
                >
                  {this.props.name}
                  <img
                    className="warehouse-list-item__information--icon"
                    src={chevronRightIcon} alt="back button"
                  />
                </Link>
              </div>
            </div>
            <div className="warehouse-list-item__label-information-container warehouse-list-item__label-information-container--address">
              <p className="warehouse-list-item__information-label">ADDRESS</p>
              <p className="warehouse-list-item__information warehouse-list-item__information--address">
                {this.props.address}, {this.props.city}, {this.props.country}
              </p>
            </div>
          </div>
          <div className="warehouse-list-item__contact-information-container">
            <div className="warehouse-list-item__label-information-container warehouse-list-item__label-information-container--contact-name">
              <p className="warehouse-list-item__information-label">
                CONTACT NAME
              </p>
              <p className="warehouse-list-item__information">{this.props.contact.name}</p>
            </div>
            <div className="warehouse-list-item__label-information-container warehouse-list-item__label-information-container--contact-info">
              <p className="warehouse-list-item__information-label">
                CONTACT INFORMATION
              </p>
              <p className="warehouse-list-item__information">{this.props.contact.phone}</p>
              <p className="warehouse-list-item__information">{this.props.contact.email}</p>
            </div>
          </div>
        </div>




        {/* Delete Modal */}
        <div className="warehouse-list-item__buttons-container">
          <button className="warehouse-list-item__button" onClick={this.toggleModal} >
            <img src={deleteIcon} alt="delete button" />
          </button>
          <WarehouseDeleteModal activeModal={this.state.modal} currentWarehouse={this.props.currentWarehouse} toggleModal={this.toggleModal} deleteWarehouse={this.props.deleteWarehouse} />
          <Link
            to={`/warehouse/edit/${this.props.id}`}
            className="warehouse-list-item__button warehouse-list-item__button--edit"
          >
            <img src={editIcon} alt="edit button" />
          </Link>
        </div>
      </li>
    );
  }

}
