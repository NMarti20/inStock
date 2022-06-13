import React from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import { Link } from "react-router-dom";

export default function WarehouseListSearch() {
  return (
    <div className="warehouse-search">
      <div className="warehouse-search__container">
        <h1 className="warehouse-search__title">Warehouses</h1>
        <form className="warehouse-search__search-bar">
          <input
            className="warehouse-search__search-bar-input"
            type="search"
            placeholder="Search..."
          />
          <button className="warehouse-search__search-button" type="submit">
            <img
              className="warehouse-search__button-icon"
              src={searchIcon}
              alt="search icon"
            />
          </button>
        </form>
        <Link
          to="/warehouse/add"
          className="warehouse-search__add-warehouse-button"
        >
          <p>&#43; Add New Warehouse</p>
        </Link>
      </div>
    </div>
  );
}
