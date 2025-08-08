import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const ProductCardDemo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/v1/products");
        const data = await response.json();
        
        // Add some demo products with different states
        const demoProducts = [
          ...data,
          {
            id: "demo-out-of-stock",
            title: "Out of Stock Item",
            description: "This product is currently unavailable",
            price: 99.99,
            imageUrl: "https://via.placeholder.com/400x300?text=Out+of+Stock",
            inStock: false,
            variants: ["S", "M", "L", "XL"]
          },
          {
            id: "demo-variants",
            title: "Premium T-Shirt",
            description: "High quality cotton with multiple size options",
            price: 45.00,
            imageUrl: "https://via.placeholder.com/400x300?text=Premium+Shirt",
            variants: ["XS", "S", "M", "L", "XL", "XXL"],
            category: "Apparel"
          }
        ];
        
        setProducts(demoProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
    toast.success(`Added ${product.title || product.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 text-center mb-3">Product Card Demo</h1>
          <p className="text-center text-muted">
            Responsive product cards with variants, stock status, and add-to-cart functionality
          </p>
        </div>
      </div>
      
      <div className="row">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex"
          >
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
      
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Features Demonstrated</h5>
              <ul className="list-unstyled">
                <li>✅ Responsive grid layout (4/3/2/1 columns)</li>
                <li>✅ Product image with aspect ratio</li>
                <li>✅ Product name and description</li>
                <li>✅ Price formatting</li>
                <li>✅ Variant dropdown (S/M/L or custom options)</li>
                <li>✅ Add to Cart button with Redux integration</li>
                <li>✅ Out of Stock state with disabled controls</li>
                <li>✅ Modern card design with shadows</li>
                <li>✅ Bootstrap 5 styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDemo; 