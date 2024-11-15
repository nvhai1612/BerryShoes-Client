import React, { useState, useEffect, useCallback } from "react";

function Filter({ products, onFilterChange, onlyPrice = false }) {
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Hàm để lọc sản phẩm
  const filterProducts = useCallback(() => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return;
    }

    let filteredProducts = products;

    // Lọc theo category
    if (category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    // Lọc theo price range
    if (priceRange !== "All") {
      switch (priceRange) {
        case "0-100":
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= 0 && product.price <= 100
          );
          break;
        case "100-200":
          filteredProducts = filteredProducts.filter(
            (product) => product.price > 100 && product.price <= 200
          );
          break;
        case "200+":
          filteredProducts = filteredProducts.filter(
            (product) => product.price > 200
          );
          break;
        default:
          break;
      }
    }

    // Gọi hàm onFilterChange để cập nhật danh sách sản phẩm đã lọc
    onFilterChange(filteredProducts);
  }, [products, category, priceRange, onFilterChange]);

  // useEffect để lọc sản phẩm mỗi khi category hoặc priceRange thay đổi
  useEffect(() => {
    filterProducts();
  }, [category, priceRange, filterProducts]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="filter">
      {/* Hiển thị bộ lọc sản phẩm nếu onlyPrice = false */}
      {!onlyPrice && (
        <>
          <h5>Categories</h5>
          <select
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="Mercurial">Mercurial</option>
            <option value="Phantom">Phantom</option>
            <option value="Tiempo">Tiempo</option>
          </select>
        </>
      )}

      <h5>Price Range</h5>
      <select
        className="form-select"
        value={priceRange}
        onChange={handlePriceRangeChange}
      >
        <option value="All">All</option>
        <option value="0-100">$0 - $100</option>
        <option value="100-200">$100 - $200</option>
        <option value="200+">$200+</option>
      </select>
    </div>
  );
}

export default Filter;
