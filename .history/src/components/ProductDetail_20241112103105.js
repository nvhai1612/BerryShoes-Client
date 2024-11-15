import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./ProductDetail.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Sử dụng để điều hướng
  const product = products.find((product) => product.id === parseInt(id)); // Tìm sản phẩm theo id

  const [quantity, setQuantity] = useState(1); // State quản lý số lượng sản phẩm
  const [selectedSize, setSelectedSize] = useState("M"); // State quản lý kích thước được chọn
  const [selectedImage, setSelectedImage] = useState(""); // State cho ảnh lớn được chọn

  if (!product) {
    return <h2>Product not found</h2>; // Hiển thị nếu không tìm thấy sản phẩm
  }

  // Cập nhật selectedImage khi người dùng nhấn vào ảnh
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Hàm để tăng hoặc giảm số lượng sản phẩm
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount)); // Số lượng tối thiểu là 1
  };

  // Điều hướng đến trang thanh toán
  const handleBuyNow = () => {
    navigate("/payment", { state: { product, quantity, selectedSize } });
  };

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize); // Gọi hàm addToCart từ props với thông tin sản phẩm
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start", // Đảm bảo căn trên cùng
      }}
      className="product-detail mt-0"
    >
      <Row>
        <Col md={6} style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            className="thumbnail-images"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "flex-start",
              marginRight: "16px",
              marginTop: "0", // Đảm bảo không có margin-top thừa
            }}
          >
            {product.additionalImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Additional ${index}`}
                style={{ width: "80px", height: "auto", cursor: "pointer" }}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
          <div
            className="main-image"
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            <img
              src={selectedImage || product.image}
              alt={product.name}
              style={{
                width: "auto",
                height: "100%",
                objectFit: "contain",
                marginTop: "0", // Đảm bảo ảnh chính không có margin trên
              }}
            />
          </div>
        </Col>

        <Col
          md={6}
          className="content-column"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Nội dung chi tiết sản phẩm */}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
