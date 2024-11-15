// src/components/Categories.js
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Sử dụng Link để chuyển hướng

function Categories() {
  return (
    <div className="text-center my-4">
      <h2>Categories of The Month</h2>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <div className="d-flex justify-content-around">
        <div>
          <img
            src="https://via.placeholder.com/150?text=Shoes"
            alt="Watches"
            className="img-fluid rounded-circle"
          />
          <h5>Mercurial</h5>
          <Link to="/shop?category=Mercurial">
            <Button variant="success">Go Shop</Button>
          </Link>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150?text=Shoes"
            alt="Shoes"
            className="img-fluid rounded-circle"
          />
          <h5>Phantom</h5>
          <Link to="/shop?category=Phantom">
            <Button variant="success">Go Shop</Button>
          </Link>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150?text=Shoes"
            alt="Accessories"
            className="img-fluid rounded-circle"
          />
          <h5>Tiempo</h5>
          <Link to="/shop?category=Tiempo">
            <Button variant="success">Go Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Categories;
