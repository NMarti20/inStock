import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import "../WarehouseAdd/_WarehouseAdd.scss";
import axios from "axios";

export default class WarehouseAdd extends Component {
  state = {
    isSubmitted: false,
  };
  addWarehouse = (e) => {
    e.preventDefault();
    const addedWarehouse = {
      warehouseName: e.target.warehouseName.value,
      address: e.target.address.value,
      city: e.target.city.value,
      country: e.target.country.value,
      contactName: e.target.contactName.value,
      position: e.target.position.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    console.log(addedWarehouse);
    axios
      .post(`http://localhost:8080/warehouses/`, addedWarehouse)

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
      <div className="warehouse-add">
        <div className="warehouse-add__container">
          <div className="warehouse-add__title-container">
            <Link to="/" className="warehouse-add__back-link">
              <img
                className="warehouse-add__back-link-icon"
                src={backArrow}
                alt="back arrow icon"
              />
            </Link>
            <h1 className="warehouse-add__title">Add New Warehouse</h1>
          </div>
          <form className="warehouse-add__form" onSubmit={this.addWarehouse}>
            <div className="warehouse-add__warehouse-details-container">
              <div className="warehouse-add__warehouse-details-inner-container">
                <h2 className="warehouse-add__section-title">
                  Warehouse Details
                </h2>
                <label className="warehouse-add__label">Warehouse Name</label>
                <input
                  className="warehouse-add__input"
                  type="text"
                  name="warehouseName"
                  placeholder="Warehouse Name"
                ></input>
                <label className="warehouse-add__label">Street Address</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="address"
                  placeholder="Street Address"
                ></input>

                <label className="warehouse-add__label">City</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="city"
                  placeholder="City"
                ></input>

                <label className="warehouse-add__label">Country</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="country"
                  placeholder="Country"
                ></input>
              </div>
            </div>
            <div className="warehouse-add__contact-details-container">
              <div className="warehouse-add__contact-details-inner-container">
                <h2 className="warehouse-add__section-title">
                  Contact Details
                </h2>
                <label className="warehouse-add__label">Contact Name</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="contactName"
                  placeholder="Contact Name"
                ></input>

                <label className="warehouse-add__label">Position</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="position"
                  placeholder="Position"
                ></input>

                <label className="warehouse-add__label">Phone Number</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                ></input>

                <label className="warehouse-add__label">Email</label>

                <input
                  className="warehouse-add__input"
                  type="text"
                  name="email"
                  placeholder="Email"
                ></input>
              </div>
            </div>
            <div className="warehouse-add__buttons-container">
              <Link
                to="/"
                className="warehouse-add__button warehouse-add__button--cancel"
              >
                Cancel
              </Link>
              <button
                className="warehouse-add__button warehouse-edit__button--save"
                type="submit"
              >
                + Add Warehouse
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
