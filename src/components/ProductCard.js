import React from "react";

function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <div className="rating">
          {"★".repeat(product.rating)}
          {"☆".repeat(5 - product.rating)}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
