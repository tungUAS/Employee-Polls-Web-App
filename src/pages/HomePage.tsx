import React from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import Question from "../components/Question";
import "../styles/Home.css";
import { QuestionsType } from "../models/question.type";
import { AuthedUserType, UsersType } from "../models/user.type";
import { formatDate } from "../helpers";
import { NotFound } from "../components/NotFound";
import { Dispatch } from "redux";

const HomePage = ({
  authedUser,
  questions,
  users,
  dispatch
}: {
  authedUser: AuthedUserType;
  questions: QuestionsType;
  users: UsersType;
  dispatch:Dispatch
}) => {
  if(!authedUser) return <NotFound/>;
  
  const filteredQuestions = (answered:boolean) =>
    questions.filter((question) =>
      answered
        ? question.answered_by.includes(authedUser.id)
        : !question.answered_by.includes(authedUser.id)
    );

  return (
    <div>
      <Nav dispatch={dispatch}/>
      <h1>Hello {authedUser?.name}</h1>
      <div className="home-container">
        {[false, true].map((answered) => (
          <div
            key={answered ? "answered" : "unanswered"}
            className={
              answered
                ? "answered-questions-container"
                : "unanswered-questions-container"
            }
          >
            <h2>{answered ? "Answered" : "Unanswered"} Questions</h2>
            <div className="questions-container">
              {filteredQuestions(answered)
                .sort((a, b) =>+new Date(b.created_at) - +new Date(a.created_at))
                .map((question) => (
                  <Question
                    key={question.id}
                    id={question.id}
                    name={
                      users.find((user) => user.id === question.created_by)?.name as string
                    }
                    timestamp={formatDate(question.created_at)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  authedUser,
  questions,
  users,
  dispatch
}: {
  authedUser: AuthedUserType;
  questions: QuestionsType;
  users: UsersType;
  dispatch:Dispatch
}) => ({
  authedUser,
  questions,
  users,
  dispatch
});

export default connect(mapStateToProps)(HomePage);
