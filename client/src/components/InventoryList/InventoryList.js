import React from "react";
import InventoryListItem from "../InventoryListItem/InventoryListItem";
import "./_InventoryList.scss";
import sortIcon from "../../assets/icons/sort-24px.svg";

export default function InventoryList({ inventoryList, deleteInventory }) {
  return (
    <>
      <div className="inventory-list__guide-container">
        <div className="inventory-list__guide">
          <div className="inventory-list__guide-item inventory-list__guide-item--inventory-item">
            <p>INVENTORY ITEM</p>
            <button className="inventory-list__guide-item-button">
              <img
                className="inventory-list__guide-item-button-icon"
                src={sortIcon}
                alt="sort button"
              />
            </button>
          </div>
          <div className="inventory-list__guide-item inventory-list__guide-item--category">
            <p>CATEGORY</p>
            <button className="inventory-list__guide-item-button">
              <img
                className="inventory-list__guide-item-button-icon"
                src={sortIcon}
                alt="sort button"
              />
            </button>
          </div>
          <div className="inventory-list__guide-item inventory-list__guide-item--status">
            <p>STATUS</p>
            <button className="inventory-list__guide-item-button">
              <img
                className="inventory-list__guide-item-button-icon"
                src={sortIcon}
                alt="sort button"
              />
            </button>
          </div>
          <div className="inventory-list__guide-item inventory-list__guide-item--qty">
            <p>QTY</p>
            <button className="inventory-list__guide-item-button">
              <img
                className="inventory-list__guide-item-button-icon"
                src={sortIcon}
                alt="sort button"
              />
            </button>
          </div>
          <div className="inventory-list__guide-item inventory-list__guide-item--warehouse">
            <p>WAREHOUSE</p>
            <button className="inventory-list__guide-item-button">
              <img
                className="inventory-list__guide-item-button-icon"
                src={sortIcon}
                alt="sort button"
              />
            </button>
          </div>
          <div className="inventory-list__guide-item inventory-list__guide-item--actions">
            <p>ACTIONS</p>
          </div>
        </div>
      </div>
      <ul className="inventory-list">
        {inventoryList.map((inventory) => (
          <InventoryListItem
            key={inventory.id}
            {...inventory}
            currentItem={inventory}
            deleteInventory={deleteInventory}
          />
        ))}
      </ul>
    </>
  );
}
