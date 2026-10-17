// Unit Test: customerReducer.js
// src/reducers/customerReducer.test.js
import { customerReducer, initialState } from "../../reducers/customerReducer";

describe("customerReducer", () => {
  it("sets loading to true and clears the error on FETCH_START", () => {
    // Arrange: start from a state that already has an error set
    const startState = { ...initialState, error: "Previous error" };
    // Act: dispatch FETCH_START through the reducer directly - no component involved
    const result = customerReducer(startState, { type: "FETCH_START" });
    // Assert: loading flips on and the old error is cleared
    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  it("stores the fetched customers and stops loading on FETCH_SUCCESS", () => {
    // Arrange: start from a state mid-fetch (loading: true)
    const loadingState = { ...initialState, loading: true };
    const customers = [{ id: 1, firstName: "Ada", lastName: "Lovelace" }];
    // Act: dispatch FETCH_SUCCESS with the fetched customers as the payload
    const result = customerReducer(loadingState, {
      type: "FETCH_SUCCESS",
      payload: customers,
    });
    // Assert: loading turns off and the customers are stored in state
    expect(result.loading).toBe(false);
    expect(result.customers).toEqual(customers);
  });

  it("removes the matching customer on DELETE_CUSTOMER", () => {
    // Arrange: start with two customers already in state
    const startState = {
      ...initialState,
      customers: [
        { id: 1, firstName: "Ada", lastName: "Lovelace" },
        { id: 2, firstName: "Alan", lastName: "Turing" },
      ],
    };
    // Act: dispatch DELETE_CUSTOMER for id 1
    const result = customerReducer(startState, {
      type: "DELETE_CUSTOMER",
      payload: 1,
    });
    // Assert: only the customer with id 2 remains
    expect(result.customers).toEqual([
      { id: 2, firstName: "Alan", lastName: "Turing" },
    ]);
  });

  it("returns the existing state for an unknown action type", () => {
    // Act: dispatch a type the reducer has no case for
    const result = customerReducer(initialState, { type: "UNKNOWN" });
    // Assert: the exact same state object is returned unchanged
    expect(result).toBe(initialState);
  });
});
