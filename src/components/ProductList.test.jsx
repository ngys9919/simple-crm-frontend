// src/components/ProductList.test.jsx
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    discountedPrice: 26.99,
    inStock: true,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.99,
    discountedPrice: 89.99,
    inStock: false,
  },
];

describe("ProductList", () => {
  it("renders a card for each provided product", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
    expect(screen.getByText("$26.99")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("renders no product cards when the list is empty", () => {
    const { container } = render(<ProductList products={[]} />);

    expect(container.querySelectorAll("h3")).toHaveLength(0);
  });
});
