import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const products = [
    { id: 1, name: "React T-Shirt", price: 25 },
    { id: 2, name: "Node Hoodie", price: 50 },
    { id: 3, name: "JS Cap", price: 15 }
  ];

  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Update quantity
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }

    setCart(cart.map(item =>
      item.id === id ? { ...item, qty } : item
    ));
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      <ProductList products={products} addToCart={addToCart} />

      <Cart cart={cart} updateQty={updateQty} removeItem={removeItem} />
    </div>
  );
}

export default App;