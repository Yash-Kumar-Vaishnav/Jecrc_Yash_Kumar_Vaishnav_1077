import React from "react";
import CartItem from "./CartItem";

function Cart({ cart, updateQty, removeItem }) {

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQty={updateQty}
          removeItem={removeItem}
        />
      ))}

      <h3>Total = ${total}</h3>
    </div>
  );
}

export default Cart;