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
    <Container className="product-detail mt-0">
      <Row>
        {/* Phần hiển thị hình ảnh sản phẩm */}
        <Col md={6} className="d-flex">
          <div className="thumbnail-images d-flex flex-column me-3">
            {/* Các hình ảnh nhỏ bổ sung bên trái */}
            {product.additionalImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Additional ${index}`}
                className="img-fluid mb-2"
                onClick={() => handleImageClick(img)} // Cập nhật selectedImage khi nhấn vào ảnh nhỏ
                style={{ cursor: "pointer" }} // Đổi con trỏ chuột khi di chuột vào ảnh
              />
            ))}
          </div>
          <div className="main-image flex-grow-1">
            <img
              src={selectedImage || product.image} // Hiển thị ảnh lớn
              alt={product.name}
              className="img-fluid mb-3"
            />
          </div>
        </Col>

        {/* Phần chi tiết sản phẩm */}
        <Col md={6}>
          <h1>{product.name}</h1>
          <p className="text-muted">${product.price}</p>

          {/* Đánh giá sản phẩm */}
          <p>
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
            <span className="text-muted">
              {" "}
              | {product.rating} Rating | {product.commentsCount} Comments
            </span>
          </p>

          {/* Mô tả sản phẩm */}
          <h5>Description:</h5>
          <p>{product.description}</p>

          {/* Màu sắc */}
          <h5>Available Color:</h5>
          <p>{product.color}</p>

          {/* Thông số kỹ thuật */}
          <h5>Specification:</h5>
          <ul>
            {product.specification.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>

          {/* Chọn kích thước */}
          <h5>Size :</h5>
          <Form>
            {["40", "41", "42", "43", "44"].map((size) => (
              <Form.Check
                inline
                label={size}
                name="size"
                type="radio"
                id={`size-${size}`}
                key={size}
                checked={selectedSize === size} // Kiểm tra kích thước được chọn
                onChange={() => setSelectedSize(size)} // Cập nhật kích thước khi người dùng chọn
              />
            ))}
          </Form>

          {/* Chọn số lượng */}
          <h5>Quantity:</h5>
          <div className="d-flex align-items-center mb-3">
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </Button>
            <span className="mx-3">{quantity}</span>
            <Button
              variant="outline-secondary"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </Button>
          </div>

          {/* Nút mua ngay và thêm vào giỏ hàng */}
          <Button variant="success" className="me-2" onClick={handleBuyNow}>
            Buy Now
          </Button>
          <Button variant="outline-success" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
