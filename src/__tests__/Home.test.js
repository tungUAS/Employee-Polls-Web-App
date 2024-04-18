import React from "react";
import { fireEvent } from "@testing-library/react";
import Home from "../pages/HomePage";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import reducer from "../redux/reducers";
import { MemoryRouter } from "react-router-dom";
import { receiveUsers } from "../redux/actions/users";
import { receiveQuestions } from "../redux/actions/questions";
import { setAuthedUser } from "../redux/actions/authedUser";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {
  const mockAuthedUser = { id: 1, name: "Sarah" };
  const mockUsers = [
    { id: 1, name: "Sarah" },
    { id: 2, name: "Tyler" },
  ];
  const mockQuestions = [
    {
      id: 1,
      created_at: "2024-01-01T00:00:00.000Z",
      created_by: 1,
      option_one: "Go to the gym",
      option_two: "Go to the cinema",
      answered_by: [1, 2],
    },
    {
      id: 2,
      created_at: "2024-01-10T00:00:00.000Z",
      created_by: 2,
      option_one: "Read a book",
      option_two: "Read a magazine",
      answered_by: [1],
    },
    {
      id: 3,
      created_at: "2024-01-02T00:00:00.000Z",
      created_by: 2,
      option_one: "Buy a new car",
      option_two: "Buy a new house",
      answered_by: [],
    },
  ];

  it("should render Home component with all components", () => {
    const store = createStore(reducer);

    store.dispatch(receiveUsers({users:mockUsers}));
    store.dispatch(receiveQuestions({questions:mockQuestions}));
    store.dispatch(setAuthedUser({
      id: mockAuthedUser.id,
      name: mockAuthedUser.name,
    }));

    const home = render(
      <MemoryRouter>
        <Provider store={store}>
          <Home
            authedUser={mockAuthedUser}
            questions={mockQuestions}
            users={mockUsers}
          />
        </Provider>
      </MemoryRouter>
    );
    const helloComponent = home.getByText("Hello Sarah");
    expect(helloComponent).toBeInTheDocument();

    const answeredQuestions = home.getByText("Answered Questions");
    expect(answeredQuestions).toBeInTheDocument();

    const unansweredQuestions = home.getByText("Unanswered Questions");
    expect(unansweredQuestions).toBeInTheDocument();

    const questionsContainer = home.container.getElementsByClassName(
      "questions-container"
    );
    expect(questionsContainer).toHaveLength(2);

    const answeredQuestionsContainer = home.container.getElementsByClassName(
      "answered-questions-container"
    );
    expect(answeredQuestionsContainer).toHaveLength(1);

    const unansweredQuestionsContainer = home.container.getElementsByClassName(
      "unanswered-questions-container"
    );
    expect(unansweredQuestionsContainer).toHaveLength(1);
  });

  it("navigates to question page when button is clicked", () => {
    
    const store = createStore(reducer);

    store.dispatch(receiveUsers({users:mockUsers}));
    store.dispatch(receiveQuestions({questions:mockQuestions}));
    store.dispatch(setAuthedUser({
      id: mockAuthedUser.id,
      name: mockAuthedUser.name,
    }));

    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Home
            authedUser={mockAuthedUser}
            questions={mockQuestions}
            users={mockUsers}
          />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(getByTestId(`show-button-${mockQuestions[0].id}`));

    expect(mockNavigate).toHaveBeenCalledWith(
      `/questions/${mockQuestions[0].id}`
    );
  });
});
