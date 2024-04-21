import React from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import Question from "../components/Question";
import "../styles/Home.css";
import "../styles/HomeTabs.css";
import { QuestionsType } from "../models/question.type";
import { AuthedUserType, UsersType } from "../models/user.type";
import { formatDate } from "../helpers";
import Protected from "../components/Protected";
import { Dispatch } from "redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
  if (!authedUser) {
    return <Protected />;
  }

  const filteredQuestions = (answered: boolean) =>
    questions.filter((question) =>
      answered
        ? question.answered_by.includes(authedUser.id)
        : !question.answered_by.includes(authedUser.id)
    );

  return (
    <div>
      <Nav dispatch={dispatch} />
      <h1>Welcome, {authedUser.name}</h1>
      <div className="home-container">
        <Tabs className="custom-tabs">
          <TabList className="tab-list">
            <Tab className="tab-item">Unanswered Questions</Tab>
            <Tab className="tab-item">Answered Questions</Tab>
          </TabList>

          <TabPanel className="tab-panel">
            <div className="questions-container">
              {filteredQuestions(false)
                .sort(
                  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )
                .map((question) => (
                  <Question
                    key={question.id}
                    id={question.id}
                    name={users.find((user) => user.id === question.created_by)?.name || ""}
                    timestamp={formatDate(question.created_at)}
                  />
                ))}
            </div>
          </TabPanel>

          <TabPanel className="tab-panel">
            <div className="questions-container">
              {filteredQuestions(true)
                .sort(
                  (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )
                .map((question) => (
                  <Question
                    key={question.id}
                    id={question.id}
                    name={users.find((user) => user.id === question.created_by)?.name || ""}
                    timestamp={formatDate(question.created_at)}
                  />
                ))}
            </div>
          </TabPanel>
        </Tabs>
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
