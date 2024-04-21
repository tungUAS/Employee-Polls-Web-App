import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "../redux/reducers";
import { MemoryRouter } from "react-router-dom";
import { receiveUsers } from "../redux/actions/users";
import { receiveScores } from "../redux/actions/scores";
import Leaderboard from "../pages/LeaderboardPage";
import { setAuthedUser } from "../redux/actions/authedUser";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Leader Board Page Test", () => {
  const mockUsers = [
    { id: 1, name: "Sarah", avatar_url: "mock_avatar_1.png" },
    { id: 2, name: "Tyler", avatar_url: "mock_avatar_2.png" },
  ];

  const mockScores = [
    {
      user_id: 1,
      answered: 1,
      created: 2,
    },
    {
      user_id: 2,
      answered: 3,
      created: 4,
    },
  ];

  it("renders leaderboard table with all components", () => {
    const store = createStore(reducer);
    store.dispatch(receiveUsers({ users: mockUsers }));
    store.dispatch(receiveScores({ scores: mockScores }));
    store.dispatch(setAuthedUser({ id: mockUsers.id, name: mockUsers.name }));

    const { getByRole, getByText, getAllByAltText, getAllByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Leaderboard
            scores={mockScores}
            users={mockUsers}
            authedUser={{ id: mockUsers.id, name: mockUsers.name }}
          />
        </Provider>
      </MemoryRouter>
    );

    const leaderboardHeader = getByRole("heading", { name: "Leaderboard" });
    expect(leaderboardHeader).toBeInTheDocument();

    const user1Name = getByText("Sarah");
    expect(user1Name).toBeInTheDocument();

    const user2Name = getByText("Tyler");
    expect(user2Name).toBeInTheDocument();

    const userAvatars = getAllByAltText("User Avatar");
    expect(userAvatars).toHaveLength(2);

    // this is sorted already
    const user1Avatar = userAvatars[0];
    expect(user1Avatar).toHaveAttribute("src", "mock_avatar_2.png");

    const user2Avatar = userAvatars[1];
    expect(user2Avatar).toHaveAttribute("src", "mock_avatar_1.png");

    const rowElements = getAllByRole("row");
    expect(rowElements).toHaveLength(3);

    const headerRow = rowElements[0];
    expect(headerRow).toHaveTextContent("User");
    expect(headerRow).toHaveTextContent("Questions Asked");
    expect(headerRow).toHaveTextContent("Questions Answered");

    const user1Row = rowElements[2];
    expect(user1Row).toHaveTextContent("Sarah");
    expect(user1Row).toHaveTextContent("2");
    expect(user1Row).toHaveTextContent("1");

    const user2Row = rowElements[1];
    expect(user2Row).toHaveTextContent("Tyler");
    expect(user2Row).toHaveTextContent("4");

    const user1Created = getByText("2");
    expect(user1Created).toBeInTheDocument();

    const user2Created = getByText("4");
    expect(user2Created).toBeInTheDocument();

    const user1Answered = getByText("1");
    expect(user1Answered).toBeInTheDocument();

    const user2Answered = getByText("3");
    expect(user2Answered).toBeInTheDocument();
  });

  it("should appear protected page when user is not authenticated", () => {
    const store = createStore(reducer);
    store.dispatch(receiveUsers({ users: mockUsers }));
    store.dispatch(receiveScores({ scores: mockScores }));

    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Leaderboard
            scores={mockScores}
            users={mockUsers}
          />
        </Provider>
      </MemoryRouter>
    );

    const notFoundHeading = getByRole("button", { name: "Login Page" });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
