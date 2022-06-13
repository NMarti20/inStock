import React from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import { Link } from "react-router-dom";

export default function InventoryListSearch() {
  return (
    <div className="inventory-search">
      <div className="inventory-search__container">
        <h1 className="inventory-search__title">Inventory</h1>
        <form className="inventory-search__search-bar">
          <input
            className="inventory-search__search-bar-input"
            type="search"
            placeholder="Search..."
          />
          <button className="inventory-search__search-button" type="submit">
            <img
              className="inventory-search__button-icon"
              src={searchIcon}
              alt="search icon"
            />
          </button>
        </form>
        <Link
          to="/inventory/add"
          className="inventory-search__add-inventory-link"
        >
          <p className="inventory-search__add-inventory">&#43; Add New Item</p>
        </Link>
      </div>
    </div>
  );
}
