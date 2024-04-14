import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import moment from "moment";
import Question from "./Question";
import "../app.css";

const Home = (props) => {
  const { authedUser, questions, users } = props;

  return (
    <div>
      <Nav />
      <h1>Hello {authedUser?.name}</h1>
      <div className="new-questions-container">
        <h2>Unanswered Questions</h2>
        <ul>
          {questions &&
            questions
              .filter((questions) => questions.answered_by.length === 0)
              .map((question) => {
                const author = users.find(
                  (user) => user.id === question.created_by
                );
                const timestamp = moment(question.created_at).format(
                  "MMMM Do YYYY, hh:mm:ss a"
                );
                return (
                  <li key={question.id}>
                    <Question
                      id={question.id}
                      name={author.name}
                      timestamp={timestamp}
                    />
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="answered-questions-container">
        <h2>Answered Questions</h2>
        <ul>
          {questions &&
            questions
              .filter((questions) => questions.answered_by.length > 0)
              .map((question) => {
                const author = users.find(
                  (user) => user.id === question.created_by
                );
                const timestamp = moment(question.created_at).format(
                  "MMMM Do YYYY, hh:mm:ss a"
                );
                return (
                  <li key={question.id}>
                    <Question
                      id={question.id}
                      name={author.name}
                      timestamp={timestamp}
                    />
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  return {
    authedUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(Home);
