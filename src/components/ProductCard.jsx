import React, { useMemo, useState } from "react";
import "./ProductCard.css";

function formatPrice(value) {
  if (value === undefined || value === null || value === "") return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `$${num.toFixed(2)}`;
}

const defaultVariants = ["S", "M", "L"];

export default function ProductCard({ product, onAddToCart }) {
  const {
    id,
    title,
    name,
    imageUrl,
    image,
    price,
    cuttedPrice,
    variants,
    inStock,
    stock,
    description,
    category,
    rating,
  } = product || {};

  const isAvailable = useMemo(() => {
    if (typeof inStock === "boolean") return inStock;
    if (typeof stock === "number") return stock > 0;
    return true;
  }, [inStock, stock]);

  const displayName = name || title || "Untitled";
  const displayImage = imageUrl || image || "https://via.placeholder.com/600x400.png?text=No+Image";
  const variantOptions = Array.isArray(variants) && variants.length > 0 ? variants : defaultVariants;
  
  // Calculate discount percentage if cuttedPrice exists
  const hasDiscount = cuttedPrice && Number(cuttedPrice) > Number(price);
  const discountPercentage = hasDiscount 
    ? Math.round(((Number(cuttedPrice) - Number(price)) / Number(cuttedPrice)) * 100)
    : 0;

  // Rating (use provided or generate stable pseudo-random based on id)
  const computedRating = useMemo(() => {
    if (typeof rating === 'number') return rating;
    const seed = String(id || displayName).split('').reduce((a,c)=>a+c.charCodeAt(0), 0);
    return Number((3.6 + (seed % 14) / 10).toFixed(1)); // 3.6 - 5.0
  }, [rating, id, displayName]);

  const [selectedVariant, setSelectedVariant] = useState(variantOptions[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = async (productData) => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    try {
      await onAddToCart(productData);
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  };

  return (
    <div 
      className={`card h-100 border-0 shadow-sm product-card ${isAddingToCart ? 'loading' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges */}
      <div className="position-relative overflow-hidden rounded-4" style={{ height: '220px', background: '#f3f4f6' }}>
        {/* Shimmer Loading Effect */}
        {!imageLoaded && (
          <div 
            className="position-absolute w-100 h-100"
            style={{
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}
        
        <img
          src={displayImage}
          alt={displayName}
          className="w-100 h-100"
          style={{ 
            objectFit: "cover",
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0,
            color: 'transparent'
          }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400.png?text=No+Image"; setImageLoaded(true); }}
        />
        
        {/* Sale Badge with Animation */}
        {hasDiscount && (
          <div className="position-absolute top-0 start-0 m-3">
            <span className="badge bg-danger px-3 py-2 fw-bold">
              <i className="fas fa-tag me-1"></i>
              -{discountPercentage}%
            </span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          type="button"
          className="btn btn-light btn-sm position-absolute top-0 end-0 m-3 rounded-circle"
          style={{ width: 38, height: 38, border: '1px solid rgba(0,0,0,0.08)' }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.stopPropagation(); setWishlisted(v => !v); }}
        >
          <i className={`${wishlisted ? 'fas' : 'far'} fa-heart`} style={{ color: wishlisted ? '#ef4444' : '#111827' }}></i>
        </button>
        
        {/* Out of Stock Badge */}
        {!isAvailable && (
          <div className="position-absolute top-0 end-0 m-3" style={{ right: wishlisted ? 50 : 'auto' }}>
            <span className="badge bg-secondary px-3 py-2 fw-bold">
              <i className="fas fa-times me-1"></i>
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="position-absolute bottom-0 start-0 m-3">
            <span className="badge bg-light text-dark px-3 py-2 small">
              <i className="fas fa-tag me-1"></i>
              {category}
            </span>
          </div>
        )}
        
        {/* Quick View Overlay */}
        {isHovered && isAvailable && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <button 
              className="btn btn-light btn-sm rounded-circle"
              style={{
                width: '40px',
                height: '40px',
                opacity: 0.9,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                animation: 'fadeInUp 0.3s ease-out'
              }}
              title="Quick View"
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column p-4">
        {/* Product Name */}
        <h6 
          className="card-title mb-2 fw-semibold text-truncate" 
          title={displayName}
          style={{ fontSize: '1rem', lineHeight: '1.4' }}
        >
          {displayName}
        </h6>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2" aria-label={`Rating ${computedRating} out of 5`}>
          {[1,2,3,4,5].map(i => (
            <i key={i} className={`fa-star me-1 ${computedRating >= i - 0.2 ? 'fas text-warning' : 'far text-muted'}`}></i>
          ))}
          <span className="small text-muted ms-1">{computedRating.toFixed(1)}</span>
        </div>
        
        {/* Description */}
        {description && (
          <p 
            className="text-muted small mb-3" 
            style={{ 
              fontSize: '0.85rem',
              lineHeight: '1.5',
              minHeight: '2.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {String(description)}
          </p>
        )}
        
        {/* Price */}
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-6 text-dark">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-muted text-decoration-line-through small">
                {formatPrice(cuttedPrice)}
              </span>
            )}
            {hasDiscount && (
              <span className="badge bg-success small">
                Save ${(Number(cuttedPrice) - Number(price)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        {/* Variant Selection */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2">
            <label className="form-label m-0 small text-muted fw-medium">
              <i className="fas fa-ruler me-1"></i>
              Size
            </label>
            <select
              className="form-select form-select-sm border-0 bg-light"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              disabled={!isAvailable}
              aria-label="Select variant"
              style={{ 
                maxWidth: 120,
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {variantOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          type="button"
          className={`btn w-100 mt-auto ${isAvailable 
            ? 'btn-success' 
            : 'btn-secondary disabled'
          } ${isAddingToCart ? 'loading' : ''}`}
          disabled={!isAvailable || isAddingToCart}
          onClick={() => handleAddToCart({ ...product, selectedVariant })}
          style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            padding: '0.75rem 1.25rem',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            opacity: isAvailable ? 1 : 0.6,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isAddingToCart ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Adding...
            </>
          ) : isAvailable ? (
            <>
              <i className="fas fa-cart-plus me-2"></i>
              Add to Cart
            </>
          ) : (
            <>
              <i className="fas fa-times me-2"></i>
              Out of Stock
            </>
          )}
        </button>
      </div>
    </div>
  );
} 