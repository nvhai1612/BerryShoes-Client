import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";

const PaymentForm = () => {
  const location = useLocation();
  const { selectedItems, product, quantity, selectedSize } =
    location.state || {};

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const invoiceRef = useRef(null);

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    console.log("Customer Info:", customerInfo);
    handlePrint();
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalPrice = () => {
    if (selectedItems) {
      return selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    } else if (product) {
      return product.price * quantity;
    }
    return 0;
  };

  if (!product && (!selectedItems || selectedItems.length === 0)) {
    return <h2>No product selected for purchase.</h2>;
  }

  const styles = {
    paymentForm: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "700",
      color: "#333",
    },
    productInfo: {
      backgroundColor: "#fff",
      padding: "15px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    },
    productTitle: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#555",
    },
    productText: {
      margin: "5px 0",
      fontSize: "16px",
      color: "#777",
    },
    formControl: {
      height: "45px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      marginBottom: "15px",
    },
    submitButton: {
      width: "100%",
      height: "50px",
      fontSize: "18px",
      fontWeight: "600",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      transition: "background-color 0.3s ease",
    },
    alert: {
      marginTop: "20px",
      fontSize: "16px",
      textAlign: "center",
      color: "#155724",
      backgroundColor: "#d4edda",
      borderColor: "#c3e6cb",
    },
  };

  return (
    <div style={styles.paymentForm}>
      <h2 style={styles.title}>Payment at Counter</h2>
      {paymentSuccess && (
        <Alert variant="success" style={styles.alert}>
          Payment Successful! Invoice has been printed.
        </Alert>
      )}

      <div style={styles.productInfo} ref={invoiceRef}>
        <h4 style={styles.productTitle}>Products Selected:</h4>
        <ul>
          {selectedItems ? (
            selectedItems.map((item) => (
              <li key={item.id} style={styles.productText}>
                {item.name} - ${item.price} x {item.quantity} = $
                {item.price * item.quantity}
              </li>
            ))
          ) : (
            <li style={styles.productText}>
              {product.name} - ${product.price} x {quantity} (Size:{" "}
              {selectedSize}) = ${product.price * quantity}
            </li>
          )}
        </ul>
        <p>
          <strong>Total: ${calculateTotalPrice()}</strong>
        </p>

        <h5>Customer Info:</h5>
        <p>Name: {customerInfo.name}</p>
        <p>Phone: {customerInfo.phone}</p>
        <p>Address: {customerInfo.address}</p>
        <p>
          Payment Method:{" "}
          {customerInfo.paymentMethod === "cash" ? "Cash" : "Bank Transfer"}
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="customerName">
          <Form.Label column sm={3}>
            Customer Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              style={styles.formControl}
              type="text"
              placeholder="Enter customer name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="customerPhone">
          <Form.Label column sm={3}>
            Phone Number
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              style={styles.formControl}
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={customerInfo.phone}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="customerAddress">
          <Form.Label column sm={3}>
            Address
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              style={styles.formControl}
              type="text"
              placeholder="Enter address"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="paymentMethod">
          <Form.Label column sm={3}>
            Payment Method
          </Form.Label>
          <Col sm={9}>
            <Form.Check
              type="radio"
              label="Cash"
              name="paymentMethod"
              value="cash"
              checked={customerInfo.paymentMethod === "cash"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Bank Transfer"
              name="paymentMethod"
              value="transfer"
              checked={customerInfo.paymentMethod === "transfer"}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Button type="submit" style={styles.submitButton}>
          Submit Payment
        </Button>
      </Form>
    </div>
  );
};

export default PaymentForm;
