import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import "./PageHeader.scss"

export default function PageHeader() {
    return (
        <header className="page-header">
            <div className="page-header__container">
                <Link to='/' >
                    <img src="http://localhost:8080/logo/InStock-Logo.svg" alt="" className="page-header__logo" />
                </Link>
                <nav className="page-header__nav">
                    <NavLink to='/' exact className="page-header__warehouses-link" activeClassName="page-header__active-link">Warehouses</NavLink>
                    <NavLink to='/inventory' className="page-header__inventory-link" activeClassName="page-header__active-link">Inventory</NavLink>
                </nav>
            </div>
        </header>
    )
}
