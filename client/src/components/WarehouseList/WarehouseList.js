import React from "react";
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import sortIcon from "../../assets/icons/sort-24px.svg";

export default function WarehouseList({ warehouseList, deleteWarehouse }) {
  return (
    <>
      <div className="warehouse-list__guide-container">
        <div className="warehouse-list__guide">
          <div className="warehouse-list__guide-item warehouse-list__guide-item--warehouse">
            <p>WAREHOUSE</p>
            <button className="warehouse-list__guide-item-button">
              <img
                className="warehouse-list__guide-item-button-icon"
                src={sortIcon} alt="sort button"
              />
            </button>
          </div>
          <div className="warehouse-list__guide-item warehouse-list__guide-item--address">
            <p>ADDRESS</p>
            <button className="warehouse-list__guide-item-button">
              <img
                className="warehouse-list__guide-item-button-icon"
                src={sortIcon} alt="sort button"
              />
            </button>
          </div>
          <div className="warehouse-list__guide-item warehouse-list__guide-item--contact-name">
            <p>CONTACT NAME</p>
            <button className="warehouse-list__guide-item-button">
              <img
                className="warehouse-list__guide-item-button-icon"
                src={sortIcon} alt="sort button"
              />
            </button>
          </div>
          <div className="warehouse-list__guide-item warehouse-list__guide-item--contact-info">
            <p>CONTACT INFORMATION</p>
            <button className="warehouse-list__guide-item-button">
              <img
                className="warehouse-list__guide-item-button-icon"
                src={sortIcon} alt="sort button"
              />
            </button>
          </div>
          <div className="warehouse-list__guide-item warehouse-list__guide-item--actions">
            <p>ACTIONS</p>
          </div>
        </div>
      </div>
      <ul className="warehouse-list">
        {warehouseList.map((warehouse) => (
          <WarehouseListItem key={warehouse.id} currentWarehouse={warehouse} {...warehouse} deleteWarehouse={deleteWarehouse} />
        ))}
      </ul>
    </>
  );
}
