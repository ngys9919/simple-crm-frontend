// src/utils/formatPrice.test.js
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats a whole number with two decimal places", () => {
    expect(formatPrice(10)).toBe("$10.00");
  });

  it("formats a decimal price", () => {
    expect(formatPrice(9.99)).toBe("$9.99");
  });

  it("rounds to two decimal places", () => {
    expect(formatPrice(9.999)).toBe("$10.00");
  });

  it("formats zero correctly", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});
