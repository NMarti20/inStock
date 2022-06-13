import { Link, Redirect } from 'react-router-dom'
import "./WarehouseDetailsInventoryItem.scss"
import DeleteModal from "../DeleteModal/DeleteModal"
import editIcon from "../../assets/icons/edit-24px.svg"
import rightIcon from "../../assets/icons/chevron_right-24px.svg"

import deleteIcon from "../../assets/icons/delete_outline-24px.svg"
import React, { Component } from 'react'

export default class WarehouseDetailsInventoryItem extends Component {
    state = {
        modal: false,
    }

    toggleModal = () => {
        if (!this.state.modal) {
            this.setState({ modal: true })
        } else {
            this.setState({ modal: false })
        }
        console.log(this.state)
    }

    // component did update is prob necessary to allow re
    // if(modal) {

    // }

    render() {
        return (
            <article className="inventory-card">
                {/* when flex- column, wrap vertically */}
                <div className="inventory-card__details">

                    <div className="inventory-card__label-info">
                        <p className="inventory-card__label">Inventory Item</p>
                        <Link className="inventory-card__link" to={`/inventory/${this.props.currentItem.id}`}>
                            {console.log(this.props.currentItem.id)}
                            <p className="inventory-card__name">{this.props.currentItem.itemName}</p>
                            <img className="inventory-card__link-icon" src={rightIcon} alt="right icon" />
                        </Link>
                    </div>
                    <div className="inventory-card__label-info">
                        <p className="inventory-card__label">Category</p>
                        <p className="inventory-card__content">{this.props.currentItem.category}</p>
                    </div>
                    <div className="inventory-card__label-info">
                        {/* somehow an if statement that if qty === 0, className = stock-red */}
                        <p className="inventory-card__label">Status</p>
                        <p className="inventory-card__status">{this.props.currentItem.status}</p>
                    </div>
                    <div className="inventory-card__label-info">
                        <p className="inventory-card__label">Qty</p>
                        <p className="inventory-card__content">{this.props.currentItem.quantity}</p>
                    </div>
                </div>
                <div className="inventory-card__icon-box">
                    <img src={deleteIcon} alt="" className="inventory-card__icon" onClick={this.toggleModal} />
                    {/* modal for delete is added here 
                may have to set state to show/hide*/}
                    <DeleteModal activeModal={this.state.modal} currentItem={this.props.currentItem} toggleModal={this.toggleModal} deleteInventory={this.props.deleteInventory} />
                    <img src={editIcon} alt="" className="inventory-card__icon" />
                </div>

            </article>

        )
    }
}


