import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import MainContent from "./components/MainContent"; // Import MainContent
import productsData from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [cartItems, setCartItems] = useState([]); // State giỏ hàng

  // Hàm tìm kiếm
  const handleSearch = (searchTerm) => {
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, isSelected: true }];
    });
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItem = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Xử lý checkbox chọn sản phẩm
  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // Tính tổng số sản phẩm trong giỏ hàng
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <Router>
      <div className="App">
        {/* Truyền cartItemCount để hiển thị số lượng sản phẩm trong giỏ hàng */}
        <MyNavbar onSearch={handleSearch} cartItemCount={cartItemCount} />
        <div className="container mt-4">
          <MainContent
            filteredProducts={filteredProducts}
            onFilterChange={setFilteredProducts}
            addToCart={addToCart}
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            removeCartItem={removeCartItem}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
