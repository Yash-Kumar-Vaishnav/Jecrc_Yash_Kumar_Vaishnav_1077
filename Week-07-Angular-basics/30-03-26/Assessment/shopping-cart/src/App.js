import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./styles/styles.css";

function App() {
  const products = [
    { id: 1, name: "React T-Shirt", price: 25 },
    { id: 2, name: "React Hoodie", price: 45 },
    { id: 3, name: "React Cap", price: 15 },
    { id: 4, name: "React Mug", price: 10 }
  ];

  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update Quantity
  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
  <div className="container">
    <h1>🛍️ React Shopping Cart</h1>

    <div className="grid">
      <ProductList
        products={products}
        addToCart={addToCart}
      />

      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  </div>
);
}

export default App;