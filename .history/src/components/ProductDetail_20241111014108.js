import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState("");

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleBuyNow = () => {
    navigate("/payment", { state: { product, quantity, selectedSize } });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "space-between" }}
      className="product-detail mt-0"
    >
      <Row>
        <Col md={6} style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "flex-start",
              marginRight: "16px",
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
              style={{ width: "auto", height: "100%", objectFit: "contain" }}
            />
          </div>
        </Col>

        <Col
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <h1>{product.name}</h1>
            <p className="text-muted">${product.price}</p>
            <p>
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
              <span className="text-muted">
                {" "}
                | {product.rating} Rating | {product.commentsCount} Comments
              </span>
            </p>
            <h5>Description:</h5>
            <p>{product.description}</p>
            <h5>Available Color:</h5>
            <p>{product.color}</p>
            <h5>Specification:</h5>
            <ul>
              {product.specification.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
            <h5>Size:</h5>
            <Form>
              {["40", "41", "42", "43", "44"].map((size) => (
                <Form.Check
                  inline
                  label={size}
                  name="size"
                  type="radio"
                  id={`size-${size}`}
                  key={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                />
              ))}
            </Form>
          </div>

          <div style={{ marginTop: "auto" }}>
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
            <Button variant="success" className="me-2" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button variant="outline-success" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
