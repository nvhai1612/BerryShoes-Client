import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Cart({
  cartItems,
  updateCartItem,
  removeCartItem,
  handleCheckboxChange,
}) {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length > 0) {
      navigate("/payment", { state: { selectedItems } });
    } else {
      alert("Please select at least one product to checkout.");
    }
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>

          <Button
            variant="success"
            disabled={calculateTotalPrice() === 0}
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
