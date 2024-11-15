import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // Import Link và useLocation

const ProductList = ({ products }) => {
  const location = useLocation(); // Khởi tạo useLocation
  const queryParams = new URLSearchParams(location.search); // Lấy tham số từ URL
  const category = queryParams.get("category"); // Lấy giá trị của tham số category

  // Lọc sản phẩm theo danh mục
  const filteredProducts = category
    ? products.filter((product) => product.name.includes(category))
    : products;

  return (
    <Row>
      {filteredProducts.map((product) => (
        <Col md={4} key={product.id}>
          {/* Sử dụng Link để chuyển hướng đến trang chi tiết sản phẩm */}
          <Link
            to={`/product/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <Card className="mb-4">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
