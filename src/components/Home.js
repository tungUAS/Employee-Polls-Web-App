import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import moment from "moment";
import Question from "./Question";
import "../styles/Home.css";

const Home = ({ authedUser, questions, users }) => {
  const filteredQuestions = (answered) =>
    questions.filter((question) =>
      answered
        ? question.answered_by.includes(authedUser.id)
        : !question.answered_by.includes(authedUser.id)
    );

  return (
    <div>
      <Nav />
      <h1>Hello {authedUser?.name}</h1>
      <div className="home-container">
        {[false, true].map((answered) => (
          <div key={answered ? "answered" : "unanswered"}>
            <h2>{answered ? "Answered" : "Unanswered"} Questions</h2>
            <div className="questions-container">
              {filteredQuestions(answered)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((question) => (
                  <Question
                    key={question.id}
                    id={question.id}
                    name={users.find((user) => user.id === question.created_by).name}
                    timestamp={moment(question.created_at).format(
                      "MMMM Do YYYY, hh:mm:ss a"
                    )}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions,
  users,
});

export default connect(mapStateToProps)(Home);
