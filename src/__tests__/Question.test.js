import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Question from "../components/Question";
import { BrowserRouter as Router } from "react-router-dom"; 


describe("Question Component", () => {
  it("renders question details and handles click event", () => {
    const props = {
      id: "123",
      name: "John Doe",
      timestamp: "April 17th 2024, 12:00:00 pm",
    };

    const { getByText, getByRole } = render(
        <Router>
          <Question {...props}/>
        </Router>
      );

    const authorName = getByText("John Doe");
    expect(authorName).toBeInTheDocument();

    const timestamp = getByText("April 17th 2024, 12:00:00 pm");
    expect(timestamp).toBeInTheDocument();


    const showButton = getByRole("button", { name: "SHOW" });
    expect(showButton).toBeInTheDocument();
  });
});
