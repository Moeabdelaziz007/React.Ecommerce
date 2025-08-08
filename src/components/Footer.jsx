import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
        <footer className="bg-dark text-light py-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4">
                        <h5 className="fw-bold mb-3" style={{color: '#ffffff'}}>React Ecommerce</h5>
                        <p className="text-muted" style={{color: '#d1d5db'}}>
                            Your one-stop destination for modern e-commerce solutions. 
                            Built with React and cutting-edge technologies.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-light" style={{color: '#ffffff'}}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-light" style={{color: '#ffffff'}}><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-light" style={{color: '#ffffff'}}><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-light" style={{color: '#ffffff'}}><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 mb-4">
                        <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <NavLink to="/product" className="text-muted text-decoration-none" style={{color: '#d1d5db'}}>
                                    Products
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/product-card-demo" className="text-muted text-decoration-none" style={{color: '#d1d5db'}}>
                                    Product Card Demo
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/ai" className="text-muted text-decoration-none" style={{color: '#d1d5db'}}>
                                    AI Catalog
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/blockchain" className="text-muted text-decoration-none" style={{color: '#d1d5db'}}>
                                    Blockchain
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 mb-4">
                        <h6 className="fw-bold mb-3" style={{color: '#ffffff'}}>Contact Info</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2 text-muted" style={{color: '#d1d5db'}}>
                                <i className="fas fa-map-marker-alt me-2"></i>
                                123 Ecommerce St, Tech City
                            </li>
                            <li className="mb-2 text-muted" style={{color: '#d1d5db'}}>
                                <i className="fas fa-phone me-2"></i>
                                +1 (555) 123-4567
                            </li>
                            <li className="mb-2 text-muted" style={{color: '#d1d5db'}}>
                                <i className="fas fa-envelope me-2"></i>
                                info@reactecommerce.com
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="my-4" style={{borderColor: '#374151'}} />
                <div className="row align-items-center">
                    <div className="col-md-6 col-12 text-center text-md-start">
                        <p className="mb-0 text-muted" style={{color: '#9ca3af'}}>
                            © 2024 React Ecommerce. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 col-12 text-center text-md-end mt-3 mt-md-0">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#" className="text-muted text-decoration-none" style={{color: '#9ca3af'}}>Privacy Policy</a>
                            <a href="#" className="text-muted text-decoration-none" style={{color: '#9ca3af'}}>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
