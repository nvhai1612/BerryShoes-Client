import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import PaymentForm from "./PaymentForm";
import Filter from "./Filter";
import Cart from "./Cart";
import Slideshow from "./Slideshow";
import Categories from "./Categories";
import AccountPage from "./AccountPage";
import productsData from "../data.json";

function MainContent({
  filteredProducts,
  onFilterChange,
  addToCart,
  cartItems,
  updateCartItem,
  removeCartItem,
  handleCheckboxChange,
}) {
  const location = useLocation();

  // Kiểm tra URL để chỉ hiển thị bộ lọc trên trang shop
  const showFilter = location.pathname.includes("/shop");

  // Lấy giá trị của tham số category từ URL
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // Cập nhật bộ lọc nếu có category
  useEffect(() => {
    if (category) {
      const filtered = productsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      onFilterChange(filtered);
    } else {
      onFilterChange(productsData); // Hiển thị tất cả sản phẩm nếu không có category
    }
  }, [category, onFilterChange]);

  // Ẩn bộ lọc sản phẩm và chỉ để lại bộ lọc giá nếu có category
  const showCategoryFilter = showFilter && !category;

  return (
    <div className="row">
      {/* Hiển thị bộ lọc nếu ở trang shop */}
      {showFilter && (
        <div className="col-md-3">
          {/* Hiển thị toàn bộ bộ lọc nếu không có category */}
          {showCategoryFilter && (
            <Filter products={productsData} onFilterChange={onFilterChange} />
          )}

          {/* Nếu có category, chỉ hiển thị bộ lọc giá */}
          {!showCategoryFilter && (
            <Filter onlyPrice={true} onFilterChange={onFilterChange} />
          )}
        </div>
      )}

      <div className={showFilter ? "col-md-9" : "col-md-12"}>
        {/* Hiển thị Slideshow và Categories chỉ ở trang chính */}
        {location.pathname === "/" && (
          <>
            <Slideshow />
            <Categories />
          </>
        )}

        <Routes>
          {/* Route cho trang danh sách sản phẩm */}
          <Route
            path="/shop"
            element={
              <ProductList products={filteredProducts} addToCart={addToCart} />
            }
          />

          {/* Route cho trang chi tiết sản phẩm */}
          <Route
            path="/product/:id"
            element={
              <ProductDetail products={productsData} addToCart={addToCart} />
            }
          />

          {/* Route cho trang thanh toán */}
          <Route path="/payment" element={<PaymentForm />} />

          {/* Route cho giỏ hàng */}
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
                handleCheckboxChange={handleCheckboxChange}
              />
            }
          />

          {/* Route cho trang đăng nhập */}
          <Route path="/login" element={<AccountPage />} />

          {/* Chuyển hướng nếu không có route nào khớp */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainContent;
