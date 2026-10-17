// src/components/ProductCard.test.jsx
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

const defaultProps = {
  name: "Wireless Mouse",
  price: 29.99,
  inStock: true,
  onSale: false,
};

describe("ProductCard", () => {
  it("renders the product name", () => {
    // Arrange: defaultProps is already set up above
    // Act: render the component
    render(<ProductCard {...defaultProps} />);
    // Assert: check the expected text is in the document
    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  it('shows "In Stock" when inStock is true', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it('shows "Out of Stock" when inStock is false', () => {
    // Arrange: spread defaultProps, then override inStock
    // Act
    render(<ProductCard {...defaultProps} inStock={false} />);
    // Assert
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("does not show the Sale badge when onSale is false", () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.queryByText("Sale!")).not.toBeInTheDocument();
  });
});
