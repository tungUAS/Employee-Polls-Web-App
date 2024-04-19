import React from "react";
import { fireEvent, render } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { Provider } from "react-redux";
import { Store, legacy_createStore as createStore } from "redux";
import reducer from "../redux/reducers";
import { MemoryRouter } from "react-router-dom";
import { receiveUsers } from "../redux/actions/users";
import { UsersType } from "../models/user.type";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Page Test", () => {
  const mockUsers = [
    { id: 1, name: "Sarah", avatar_url: "avatar1" },
    { id: 2, name: "Tyler", avatar_url: "avatar2" },
  ];

  it("renders login form with select input and button", () => {
    const store = createStore(reducer);
    store.dispatch(receiveUsers({users: mockUsers}));

    const { getByText, getByLabelText, getByRole, asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage users={mockUsers} />
        </Provider>
      </MemoryRouter>
    );

    const loginHeader = getByText("Log In");
    expect(loginHeader).toBeInTheDocument();

    const selectInput = getByLabelText("Select your name:");
    expect(selectInput).toBeInTheDocument();

    const loginButton = getByRole("button", { name: "Let's Go" });
    expect(loginButton).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it("dispatches setAuthedUser action and navigates to questions page on login", () => {
    const store = createStore(reducer);
    store.dispatch(receiveUsers({users: mockUsers}));

    const { getByLabelText, getAllByTestId, getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginPage users={mockUsers} />
        </Provider>
      </MemoryRouter>
    );

    const selectInput = getByLabelText("Select your name:");
    fireEvent.change(selectInput, { target: { value: "Sarah" } });
    const options = getAllByTestId("select-option");
    expect(options[0].selected).toBe(true);

    const loginButton = getByRole("button", { name: "Let's Go" });
    fireEvent.click(loginButton);
    setTimeout(() => {
      expect(store.getState().authedUser).toEqual({
        id: 1,
        name: "Sarah",
      });

      expect(mockNavigate).toBe("/questions");
    }, 1000);
  });

  it("should not dispatch setAuthedUser action and navigates to questions page on login", () => {
    const store = createStore(reducer);

    render(
        <MemoryRouter>
        <Provider store={store}>
          <LoginPage users={mockUsers} />
        </Provider>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(store.getState().authedUser).toEqual(null);

      expect(mockNavigate).notToHaveBeenCalled();
    }, 1000);
  });
});
