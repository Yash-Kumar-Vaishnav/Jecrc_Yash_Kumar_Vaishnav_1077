import React from "react";

function CartItem({ item, updateQuantity, removeItem }) {
  return (
    <div className="cart-item">
      
      <h4>🛍️ {item.name}</h4>

      <div className="quantity">
        <button
          onClick={() => updateQuantity(item.id, -1)}
        >
          ➖
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, 1)}
        >
          ➕
        </button>
      </div>

      <p>💲{item.price * item.quantity}</p>

      <button
        className="remove"
        onClick={() => removeItem(item.id)}
      >
        ❌
      </button>

    </div>
  );
}

export default CartItem;