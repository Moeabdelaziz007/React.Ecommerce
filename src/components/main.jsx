import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">New Season Arrivals</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Explore AI discovery, blockchain wallet, and our modern product card UI.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <NavLink to="/ai" className="btn btn-primary btn-sm">
                  <i className="fas fa-magic me-1"></i> AI Catalog
                </NavLink>
                <NavLink to="/blockchain" className="btn btn-outline-light btn-sm">
                  <i className="fas fa-link me-1"></i> Blockchain Demo
                </NavLink>
                <NavLink to="/product-card-demo" className="btn btn-light btn-sm text-dark">
                  <i className="fas fa-box me-1"></i> Product Card Demo
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
