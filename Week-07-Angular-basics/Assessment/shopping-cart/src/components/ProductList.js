import React from "react";

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Products</h2>

      {products.map(product => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product)} style={{ marginLeft: "10px" }}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;