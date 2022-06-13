import "./WarehouseDeleteModal.scss"
import closeIcon from '../../assets/icons/close-24px.svg'

import React, { Component } from 'react'


export default class DeleteModal extends Component {
    render() {
        return (
            <section className={!this.props.activeModal ? 'inactive' : 'active'}>
                <div className="delete-modal">
                    <img src={closeIcon} alt="" className="delete-modal__icon" onClick={this.props.toggleModal} />
                    <h3 className="delete-modal__title">Delete {this.props.currentWarehouse.name} inventory item?</h3>
                    <p className="delete-modal__text">Please confirm that you'd like to delete the {this.props.currentWarehouse.name} inventory item from your inventory list? You won't be able to undo this action.</p>
                    <div className="delete-modal__iconbox">
                        <button className="delete-modal__cancel" onClick={this.props.toggleModal}>Cancel</button>
                        <button className="delete-modal__delete" onClick={
                            () => {
                                this.props.deleteWarehouse(this.props.currentWarehouse);
                                this.props.toggleModal()
                            }}>Delete</button>
                    </div>
                </div>
            </section >
        )
    }
}