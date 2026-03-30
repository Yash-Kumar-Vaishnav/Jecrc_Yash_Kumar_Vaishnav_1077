import React from "react";

function CartItem({ item, updateQty, removeItem }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {item.name} x {item.qty} = ${item.price * item.qty}

      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
      <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>

      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;