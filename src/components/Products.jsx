import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const API_BASE = process.env.REACT_APP_API_BASE || "";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/v1/products`);
      if (componentMounted) {
        const json = await response.json();
        setData(json);
        setFilter(json);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col-lg-4 col-md-6 col-12 mb-4">
            <Skeleton height={360} />
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const handleAddDemoProduct = async () => {
    try {
      const demo = {
        title: `Demo Product ${Date.now() % 1000}`,
        description: "Temporary demo item added from UI",
        price: Number((Math.random() * 90 + 10).toFixed(2)),
        category: "Apparel",
        imageUrl: "https://via.placeholder.com/600x400?text=New+Product",
      };
      const res = await fetch(`${API_BASE}/api/v1/products`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demo)
      });
      const created = await res.json();
      setData(prev => [created, ...prev]);
      setFilter(prev => [created, ...prev]);
      toast.success('Product added');
    } catch (e) {
      toast.error('Failed to add product');
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
          <div className="buttons">
            <button className="btn btn-outline-dark btn-sm m-1" onClick={() => setFilter(data)}>All</button>
            <button className="btn btn-outline-dark btn-sm m-1" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
            <button className="btn btn-outline-dark btn-sm m-1" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
            <button className="btn btn-outline-dark btn-sm m-1" onClick={() => filterProduct("jewelery")}>Jewelery</button>
            <button className="btn btn-outline-dark btn-sm m-1" onClick={() => filterProduct("electronics")}>Electronics</button>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm" onClick={handleAddDemoProduct}><i className="fas fa-plus me-1"></i>Add Product</button>
          </div>
        </div>

        {filter.map((product) => (
          <div id={product.id} key={product.id} className="col-lg-4 col-md-6 col-12 mb-4 d-flex">
            <ProductCard
              product={product}
              onAddToCart={(p) => {
                toast.success("Added to cart");
                addProduct(p);
              }}
            />
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
