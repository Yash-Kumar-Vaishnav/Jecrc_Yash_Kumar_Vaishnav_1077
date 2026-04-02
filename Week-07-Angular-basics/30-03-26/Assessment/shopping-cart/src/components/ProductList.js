import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, addToCart }) {
  return (
    <div className="products">
      <h2>🛒 Products</h2>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;