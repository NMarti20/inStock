import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import "./_WarehouseEdit.scss";
import axios from "axios";

export default class WarehouseEdit extends Component {
  state = {
    isSubmitted: false,
  };
  editWarehouse = (e) => {
    e.preventDefault();
    const editedWarehouse = {
      name: e.target.warehouseName.value,
      address: e.target.address.value,
      city: e.target.city.value,
      country: e.target.country.value,
      name: e.target.contactName.value,
      position: e.target.position.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    axios
      .put(
        `http://localhost:8080/warehouses/${this.props.match.params.id}`,
        editedWarehouse
      )

      .then((res) => {
        this.setState({ isSubmitted: true });
        console.log(res);
      });
  };
  render() {
    if (this.state.isSubmitted) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div className="warehouse-edit">
        <div className="warehouse-edit__container">
          <div className="warehouse-edit__title-container">
            <Link to="/" className="warehouse-edit__back-link">
              <img
                className="warehouse-edit__back-link-icon"
                src={backArrow}
                alt="back arrow icon"
              />
            </Link>
            <h1 className="warehouse-edit__title">Edit Warehouse</h1>
          </div>
          <form className="warehouse-edit__form" onSubmit={this.editWarehouse}>
            <div className="warehouse-edit__warehouse-details-container">
              <div className="warehouse-edit__warehouse-details-inner-container">
                <h2 className="warehouse-edit__section-title">
                  Warehouse Details
                </h2>
                <label className="warehouse-edit__label">Warehouse Name</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="warehouseName"
                  placeholder="King West"
                />
                <label className="warehouse-edit__label">Street Address</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="address"
                  placeholder="469 King Street West"
                />
                <label className="warehouse-edit__label">City</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="city"
                  placeholder="Toronto"
                ></input>
                <label className="warehouse-edit__label">Country</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="country"
                  placeholder="CAN"
                ></input>
              </div>
            </div>
            <div className="warehouse-edit__contact-details-container">
              <div className="warehouse-edit__contact-details-inner-container">
                <h2 className="warehouse-edit__section-title">
                  Contact Details
                </h2>
                <label className="warehouse-edit__label">Contact Name</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="contactName"
                  placeholder="Graeme Lyon"
                ></input>
                <label className="warehouse-edit__label">Position</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="position"
                  placeholder="Warehouse Manager"
                ></input>
                <label className="warehouse-edit__label">Phone Number</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="phone"
                  placeholder="+1 (647) 504-0911"
                ></input>
                <label className="warehouse-edit__label">Email</label>
                <input
                  className="warehouse-edit__input"
                  type="text"
                  name="email"
                  placeholder="glyon@instock.com"
                ></input>
              </div>
            </div>
            <div className="warehouse-edit__buttons-container">
              <Link
                to="/"
                className="warehouse-edit__button warehouse-edit__button--cancel"
              >
                Cancel
              </Link>
              <button
                className="warehouse-edit__button warehouse-edit__button--save"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
