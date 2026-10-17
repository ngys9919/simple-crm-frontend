// src/components/ProductCard.jsx
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ name, price, inStock, onSale }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="price">{formatPrice(price)}</p>
      {onSale && <span className="badge sale">Sale!</span>}
      <span className={`badge ${inStock ? "in-stock" : "out-of-stock"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  );
}

export default ProductCard;
