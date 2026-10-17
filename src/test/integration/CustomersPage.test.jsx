// Integration Test: CustomersPage.jsx
// src/pages/CustomersPage.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { CustomerContext } from "../../contexts/CustomerContext";
import CustomersPage from "../../pages/CustomersPage";

// Fixture data shaped like real customer records from the API
const mockCustomers = [
  {
    id: "1",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "555-0100",
    status: "active",
    tags: ["vip"],
  },
  {
    id: "2",
    firstName: "Grace",
    lastName: "Hopper",
    email: "grace@example.com",
    phone: "555-0101",
    status: "inactive",
    tags: [],
  },
];

// Stands in for CustomerProvider - a plain object with the exact shape
// CustomersPage destructures from useContext(CustomerContext)
const mockContextValue = {
  filteredCustomers: mockCustomers,
  loading: false,
  error: null,
  searchTerm: "",
  statusFilter: "all",
  setSearchTerm: vi.fn(),
  setStatusFilter: vi.fn(),
};

describe("CustomersPage", () => {
  it("renders a card for each filtered customer", () => {
    // Arrange + Act: render CustomersPage wrapped in both a mock Context
    // provider and a MemoryRouter - both are required for it to render at all
    render(
      <CustomerContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={["/app/customers"]}>
          <Routes>
            <Route path="/app/customers" element={<CustomersPage />} />
            {/* Placeholder route - only its existence matters, not its content */}
            <Route
              path="/app/customers/:id"
              element={<div>Customer Detail Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </CustomerContext.Provider>,
    );

    // Assert: both mock customers appear on screen
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
  });

  it("navigates to the customer detail page when a card is selected", async () => {
    // Arrange: userEvent simulates real user interaction more faithfully
    // than fireEvent (it fires the full sequence of events a click causes)
    const user = userEvent.setup();

    render(
      <CustomerContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={["/app/customers"]}>
          <Routes>
            <Route path="/app/customers" element={<CustomersPage />} />
            <Route
              path="/app/customers/:id"
              element={<div>Customer Detail Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </CustomerContext.Provider>,
    );

    // Act: click Ada's card - the click bubbles up to CustomerCard's onClick,
    // which calls navigate() to move to the detail route
    await user.click(screen.getByText("Ada Lovelace"));

    // Assert: wait for the router to swap in the placeholder detail route
    expect(await screen.findByText("Customer Detail Page")).toBeInTheDocument();
  });
});
