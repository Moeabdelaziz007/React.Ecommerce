import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavbarWalletStatus from './web3/NavbarWalletStatus'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active border-bottom border-2 border-primary' : ''}`
    const logoSrc = `${process.env.PUBLIC_URL || ''}/assets/logo.svg`;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2 d-flex align-items-center gap-2" to="/">
                    <img src={logoSrc} alt="Logo" height="28" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
                    <span>React Ecommerce</span>
                </NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className={linkClass} to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkClass} to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkClass} to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={linkClass} to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex align-items-center gap-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-snowflake" style={{fontSize: '0.8em'}}></i>
                                Pages
                            </a>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/ai">AI Catalog</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/blockchain">Blockchain</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/product-card-demo">Product Card Demo</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/register">Register</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-2">
                        <NavbarWalletStatus />
                        <NavLink to="/cart" className="btn btn-outline-dark m-2">
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar